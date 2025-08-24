import { NavItemDef } from "../../types";
import { NavigationTreeViewState } from "../../NavigationTreeView/store";
import createSelector from "@/UI/utils/createSelector";

const selectorItemsState = <OtherItemDef extends object = {}>(
  state: NavigationTreeViewState<OtherItemDef>
) => state.items;

/**
 * Get the main items.
 * @param {NavigationTreeViewState<OtherItemDef>} state The state of the navigation tree view.
 * @param {boolean} useDefault If it's true, it will access default parent node items.
 * @returns {NavigationTreeViewState<OtherItemDef>["items"]["itemsLookup"]} The items state.
 */
export const selectorItems = createSelector(
  [selectorItemsState, (_, useDefault: boolean = false) => useDefault],
  <OtherItemDef extends object>(
    items: NavigationTreeViewState<OtherItemDef>["items"],
    useDefault: boolean = false
  ) => (useDefault ? items.itemsDefaultLookup : items.itemsLookup)
);

/**
 * if itemId availabe.
 * - Get the model an item by `id`.
 *
 * if itemId = null.
 * - Get all item models.
 * @param {NavigationTreeViewState<OtherItemDef>} state The state of the navigation tree view.
 * @param {NavItemDef["id"]} itemId The id of item.
 * @returns {NavigationTreeViewState<OtherItemDef>["items"]["itemsLookup"]} The item model by given id, or item models.
 */
export const selectorItemModel = createSelector(
  [selectorItemsState, (_, itemId: string | null = null) => itemId],
  <ItemId extends NavItemDef["id"] | null, OtherItemDef extends object>(
    items: NavigationTreeViewState<OtherItemDef>["items"],
    itemId: ItemId
  ) =>
    typeof itemId === "string"
      ? items.itemModelLookup?.[itemId]
      : items.itemModelLookup
);

/**
 * Get the ids of the item's children by root `id`.
 * @param {NavigationTreeViewState<OtherItemDef>} state The state of the navigation tree view.
 * @param {NavItemDef["id"]} itemId The id of item, To get the root items, pass `null` as the `id`.
 * @returns {NavigationTreeViewState<OtherItemDef>["items"]["itemsLookup"]} The ids of the item's children.
 */
export const selectorItemOrderedChildrenIds = createSelector(
  [selectorItemsState, (_, itemId: string | null = null) => itemId],
  <ItemId extends NavItemDef["id"] | null, OtherItemDef extends object>(
    items: NavigationTreeViewState<OtherItemDef>["items"],
    itemId: ItemId
  ) =>
    typeof itemId === "string"
      ? items.itemOrderedChildrenIdsLookup?.[itemId]
      : items.itemOrderedChildrenIdsLookup
);

/**
 * Get the index numbers of the item's children by root `id`.
 * @param {NavigationTreeViewState<OtherItemDef>} state The state of the navigation tree view.
 * @param {NavItemDef["id"]} itemId The id of item, To get the root items, pass `null` as the `id`.
 * @returns {NavigationTreeViewState<OtherItemDef>["items"]["itemsLookup"]} The index numbers of the item's children.
 */
export const selectorItemChildrenIndexes = createSelector(
  [selectorItemsState, (_, itemId: string | null = null) => itemId],
  <ItemId extends NavItemDef["id"] | null, OtherItemDef extends object>(
    items: NavigationTreeViewState<OtherItemDef>["items"],
    itemId: ItemId
  ) =>
    typeof itemId === "string"
      ? items.itemChildrenIndexesLookup?.[itemId]
      : items.itemChildrenIndexesLookup
);

/**
 * Get the jsx nav items.
 * @param {NavigationTreeViewState<OtherItemDef>} state The state of the navigation tree view.
 * @returns {NavigationTreeViewState<OtherItemDef>["items"]["itemsLookup"]} The nav jsx items.
 */
export const selectorNavItemsJSX = createSelector(
  [selectorItemsState],
  <OtherItemDef extends object>(
    items: NavigationTreeViewState<OtherItemDef>["items"]
  ) => items.itemsJSXLookup
);
