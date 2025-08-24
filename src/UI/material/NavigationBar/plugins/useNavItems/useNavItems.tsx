"use client";

import * as React from "react";
import NavigationTreeViewStore from "../../NavigationTreeView/store";
import { NavItemDef } from "../../types";
import {
  selectorItemChildrenIndexes,
  selectorItemModel,
  selectorItemOrderedChildrenIds,
  selectorItems,
} from "./useNavItems.selectors";
import {
  buildSiblingIndexes,
  mergeHrefsItemsWithParentId,
  processNavItemsLookups,
  ProcessNavItemsLookupsParameters,
} from "./useNavItems.utils";
import { NavItem } from "../../components";
import useSelector from "@/UI/hooks/useSelector";
import resolveSelector from "@/UI/utils/resolveSelector";

/**
 * The nav items plugin to support the nav items.
 *
 * @param store - The NavigationTreeView store.
 * @returns nav items publicAPIs and instances.
 */
export default function useNavItems<OtherItemDef extends object>(
  store: NavigationTreeViewStore<OtherItemDef>
): UseNavItemsReturnValue<OtherItemDef> {
  type PublicAPI = UseNavItemsReturnValue<OtherItemDef>["publicAPI"];
  type Instance = UseNavItemsReturnValue<OtherItemDef>["instance"];

  // publicAPI
  const getItem: PublicAPI["getItem"] = (itemId, hardSelector = false) =>
    (hardSelector
      ? useSelector(store, selectorItemModel, itemId)
      : selectorItemModel(store.state, itemId)) as NavItemDef<OtherItemDef>;

  const getParentNode: PublicAPI["getParentNode"] = (
    useDefault = false,
    hardSelector = false
  ) =>
    (hardSelector
      ? useSelector(store, selectorItems)
      : selectorItems(store.state, useDefault)) as NavItemDef<OtherItemDef>[];

  const getParentId: PublicAPI["getParentId"] = (id, hardSelector = false) =>
    (hardSelector
      ? useSelector(store, selectorItemModel, id)?.id
      : selectorItemModel(store.state, id)?.id) as NavItemDef["id"] | null;

  const getItemOrderedChildrenIds = <ItemId extends NavItemDef["id"] | null>(
    id: ItemId,
    hardSelector = false
  ) =>
    (hardSelector
      ? useSelector(store, selectorItemOrderedChildrenIds, id)
      : selectorItemOrderedChildrenIds(
          store.state,
          id
        )) as ItemId extends string
      ? NavItemDef["id"][]
      : Record<string, NavItemDef["id"][]>;

  const getItemChildrenIndexes = <ItemId extends NavItemDef["id"] | null>(
    id: ItemId,
    hardSelector = false
  ) =>
    (hardSelector
      ? useSelector(store, selectorItemChildrenIndexes, id)
      : selectorItemChildrenIndexes(store.state, id)) as ItemId extends string
      ? Record<NavItemDef["id"], number>
      : Record<string, Record<NavItemDef<OtherItemDef>["id"], number>>;

  // instances -------------------------------------------------
  const setItem: Instance["setItem"] = (itemId, updater) => {
    if (itemId && updater) {
      store.update((prevState) => {
        const prevItemsState = prevState.items;

        const newModelMap = prevItemsState?.itemModelLookup as Record<
          string,
          NavItemDef<OtherItemDef>
        >;
        const newItemOrderedChildrenIdsLookup =
          prevItemsState.itemOrderedChildrenIdsLookup;
        const newItemChildrenIndexesLookup =
          prevItemsState.itemChildrenIndexesLookup;

        if (newModelMap[itemId] === undefined) {
          console.warn(`${itemId} was not found, to set`);
          return prevState;
        }

        const prevItem = prevItemsState?.itemModelLookup?.[
          itemId
        ] as NavItemDef<OtherItemDef>;
        const newItemObj = resolveSelector(updater, prevItem);

        newModelMap[itemId] = {
          ...prevItem,
          ...newItemObj,
          id: prevItem.id,
        } as NavItemDef<OtherItemDef>;

        if (newItemObj?.children) {
          (
            newItemOrderedChildrenIdsLookup as Record<
              string,
              NavItemDef["id"][]
            >
          )[itemId] = [];
          delete newItemChildrenIndexesLookup?.[itemId];

          newItemObj.children?.map((item) => {
            delete newModelMap?.[item.id];
            newModelMap[item.id] = item as NavItemDef<OtherItemDef>;

            (
              newItemOrderedChildrenIdsLookup as Record<
                string,
                NavItemDef["id"][]
              >
            )[itemId]?.push(item.id);
          });

          (
            newItemChildrenIndexesLookup as Record<
              string,
              Record<string, number>
            >
          )[itemId] = buildSiblingIndexes(
            newItemOrderedChildrenIdsLookup?.[itemId] as string[]
          );
        }

        return {
          ...prevState,
          items: {
            ...prevState.items,
            itemModelLookup: newModelMap,
            itemOrderedChildrenIdsLookup: newItemOrderedChildrenIdsLookup,
            itemChildrenIndexesLookup: newItemChildrenIndexesLookup,
          },
        };
      });
    }
  };

  const addItems: Instance["addItems"] = ({ items, ...other }) => {
    if (items) {
      store.update((prevState) => {
        const prevItemsState = prevState.items;
        const newItems = mergeHrefsItemsWithParentId(items);

        const itemsLookup: readonly NavItemDef<OtherItemDef>[] = [
          ...(prevItemsState.itemsLookup as NavItemDef<OtherItemDef>[]),
          ...newItems,
        ];

        const generateItemsLoockup = processNavItemsLookups({
          items: itemsLookup,
          ...other,
        });

        const itemsDefaultLookup: readonly NavItemDef<OtherItemDef>[] = [
          ...(prevItemsState.itemsDefaultLookup as NavItemDef<OtherItemDef>[]),
          ...items,
        ];

        return {
          ...prevState,
          items: {
            itemsDefaultLookup,
            itemsLookup,
            itemsJSXLookup: itemsLookup.map((item, i) => (
              <NavItem itemId={item.id} key={i} />
            )),
            ...generateItemsLoockup,
          },
        };
      });
    }
  };

  return {
    publicAPI: {
      getItem,
      getParentNode,
      getParentId,
      getItemOrderedChildrenIds,
      getItemChildrenIndexes,
    },
    instance: {
      setItem,
      addItems,
    },
  } as UseNavItemsReturnValue<OtherItemDef>;
}

export interface UseNavItemsPublicAPI<OtherItemDef extends object = {}> {
  /**
   * Get the item with the given id.
   * It returns an object with the `id` and `element` properties.
   * @param {NavItemDef["id"]} id The id of the item to retrieve.
   * @param {boolean} hardSelector If it's true, the `useSelector` will be applied.
   * @returns {R} The item with the given id.
   */
  getItem: (
    id: NavItemDef["id"],
    hardSelector?: boolean
  ) => NavItemDef<OtherItemDef>;
  /**
   * Get all the items in the same format as provided by `props.items`.
   * @param {boolean} useDefault If it's true, it will access default parent node items.
   * @param {boolean} hardSelector If it's true, the `useSelector` will be applied.
   * @returns {R[]} The items in the `NavigationBar`.
   */
  getParentNode: (
    useDefault?: boolean,
    hardSelector?: boolean
  ) => NavItemDef<OtherItemDef>[];
  /** * Get the id of the parent item.
   * @param {NavItemDef["id"]} id The id of the item to whose parentId we want to retrieve.
   * @param {boolean} hardSelector If it's true, the `useSelector` will be applied.
   * @returns {NavItemDef["id"] | null} The id of the parent item.
   */
  getParentId: (
    id: NavItemDef["id"],
    hardSelector?: boolean
  ) => NavItemDef["id"] | null;
  /**
   * Get the ids of a given item's children.
   * Those ids are returned in the order they should be rendered.
   * To get the root items, pass `null` as the `id`.
   * @param {ItemId} id The id of the item to get the children of.
   * @param {boolean} hardSelector If it's true, the `useSelector` will be applied.
   * @returns The ids of the item's children.
   */
  getItemOrderedChildrenIds: <ItemId extends NavItemDef["id"] | null>(
    itemId: ItemId,
    hardSelector: boolean
  ) => ItemId extends string
    ? NavItemDef["id"][]
    : Record<string, NavItemDef["id"][]>;
  /**
   * Get the index numbers of a given item's children.
   * Those index numbers are returned in the order they should be rendered.
   * To get the root items, pass `null` as the `id`.
   * @param {ItemId} id The id of the item to get the children of.
   * @param {boolean} hardSelector If it's true, the `useSelector` will be applied.
   * @returns The index numbers of the item's children.
   */
  getItemChildrenIndexes: <ItemId extends NavItemDef["id"] | null>(
    id: ItemId,
    hardSelector?: boolean
  ) => ItemId extends string
    ? Record<NavItemDef["id"], number>
    : Record<string, Record<NavItemDef<OtherItemDef>["id"], number>>;
}

interface AddItemParameters<OtherItemDef extends object>
  extends ProcessNavItemsLookupsParameters<OtherItemDef> {}
export interface UseNavItemsInstance<OtherItemDef extends object = {}> {
  /**
   * Sets the item properties with given itemId.
   *
   * @param {NavItemDef["id"]} itemId The id of item.
   * @param updater The updater to set the item properties.
   */
  setItem: (
    itemId: NavItemDef["id"],
    updater:
      | Omit<NavItemDef, "id">
      | ((prevState: NavItemDef<OtherItemDef>) => Omit<NavItemDef, "id">)
  ) => void;
  /**
   * Add an array of items to the navigation tree.
   * @param {AddItemParameters<OtherItemDef>} args The items to add to the navigation tree.
   */
  addItems: (arr: AddItemParameters<OtherItemDef>) => void;
}

export interface UseNavItemsReturnValue<OtherItemDef extends object = {}> {
  publicAPI: UseNavItemsPublicAPI<OtherItemDef>;
  instance: UseNavItemsInstance<OtherItemDef>;
}
