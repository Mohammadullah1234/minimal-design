import { isExternalLink } from "@/UI/utils/url";
import { NavigationTreeViewState } from "../../NavigationTreeView/store";
import { NavItemDef } from "../../types";

export const TREE_VIEW_ROOT_PARENT_ID = "__TREE_VIEW_ROOT_PARENT_ID__";
export const buildSiblingIndexes = (siblings: NavItemDef["id"][]) => {
  const siblingsIndexLookup: Record<NavItemDef["id"], number> = {};
  siblings.forEach((childId, index) => {
    siblingsIndexLookup[childId] = index;
  });
  return siblingsIndexLookup;
};

/**
 * Merges the item parent href(s) with children href(s).
 *
 * @param items - The items array.
 * @param href - The href prop to merge, [default=null].
 * @param - The parent id, that forward to children, [default=null].
 * @returns Merged hrefs items array with parentId.
 */
export function mergeHrefsItemsWithParentId<OtherItemDef extends object>(
  items: readonly NavItemDef<OtherItemDef>[],
  href: string | null = null,
  parentId: string | null = null
): NavItemDef<OtherItemDef>[] {
  return items.map((item): NavItemDef<OtherItemDef> => {
    if (parentId || href || item?.href || item?.children) {
      const mergeHrefs =
        item?.href && href ? `${href}${item?.href}` : item.href;
      const renderHref =
        item?.href && isExternalLink(item?.href) ? item?.href : mergeHrefs;

      return {
        ...item,
        href: renderHref,
        parentId,
        ...(item?.children
          ? {
              children: mergeHrefsItemsWithParentId(
                item.children,
                renderHref,
                item.id
              ),
            }
          : {}),
      };
    }

    return item;
  });
}

const checkId = (
  id: string,
  item: NavItemDef,
  itemModelLookup: Record<string, NavItemDef>
) => {
  if (id == null) {
    throw new Error(
      [
        "RUI: The NavigationBar component requires all items to have a unique `id` property.",
        "An item was provided without id in the `items` prop:",
        JSON.stringify(item),
      ].join("\n")
    );
  }

  if (itemModelLookup[id] != null) {
    throw new Error(
      [
        "RUI: The NavigationBar component requires all items to have a unique `id` property.",
        `Two items were provided with the same id in the \`items\` prop: "${id}"`,
      ].join("\n")
    );
  }
};

export interface ProcessNavItemsLookupsParameters<
  OtherItemDef extends object = {},
> {
  items: readonly NavItemDef<OtherItemDef>[];
  /**
   * The initial parent id.
   */
  initialParentId?: string | null;
  /**
   * If it's true, the item children will be ignored.
   */
  ignoreChildren?: boolean;
}
export interface ProcessNavItemsLookupsReturnValue<
  OtherItemDef extends object = {},
> extends Pick<
    NavigationTreeViewState<OtherItemDef>["items"],
    | "itemModelLookup"
    | "itemOrderedChildrenIdsLookup"
    | "itemChildrenIndexesLookup"
  > {}

export const processNavItemsLookups = <OtherItemDef extends object>({
  items,
  initialParentId = null,
  ignoreChildren = false,
}: ProcessNavItemsLookupsParameters<OtherItemDef>): ProcessNavItemsLookupsReturnValue<OtherItemDef> => {
  type ItemDef = NavItemDef<OtherItemDef>;

  const itemModelLookup: ProcessNavItemsLookupsReturnValue<OtherItemDef>["itemModelLookup"] =
    {};
  const itemOrderedChildrenIdsLookup: ProcessNavItemsLookupsReturnValue<OtherItemDef>["itemOrderedChildrenIdsLookup"] =
    {
      [TREE_VIEW_ROOT_PARENT_ID]: [],
    };

  const processItem = (item: ItemDef, parentId: string | null) => {
    checkId(item.id, item, itemModelLookup);
    itemModelLookup[item.id] = item;

    const parentIdWithDefault = parentId ?? TREE_VIEW_ROOT_PARENT_ID;
    if (!itemOrderedChildrenIdsLookup[parentIdWithDefault]) {
      itemOrderedChildrenIdsLookup[parentIdWithDefault] = [];
    }
    itemOrderedChildrenIdsLookup[parentIdWithDefault].push(
      item.id as string & NavItemDef<OtherItemDef>
    );

    if (!ignoreChildren && item?.children) {
      item.children?.forEach((child) => processItem(child as ItemDef, item.id));
    }
  };

  items?.forEach((item) => processItem(item, initialParentId));
  const itemChildrenIndexesLookup: ProcessNavItemsLookupsReturnValue<OtherItemDef>["itemChildrenIndexesLookup"] =
    {};

  Object.keys(itemOrderedChildrenIdsLookup).forEach((parentId) => {
    itemChildrenIndexesLookup[parentId] = buildSiblingIndexes(
      itemOrderedChildrenIdsLookup[parentId]
    );
  });

  return {
    itemModelLookup,
    itemOrderedChildrenIdsLookup,
    itemChildrenIndexesLookup,
  };
};
