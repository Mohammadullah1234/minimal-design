"use client";

import { NavItemDef } from "../../types";
import NavigationTreeViewStore, {
  NavigationTreeViewState,
  NavigationTreeViewStateExpantionValue,
} from "../../NavigationTreeView/store";
import { selectorItemModel } from "../useNavItems";
import useSelector from "@/UI/hooks/useSelector";
import {
  selectorExpandedItems,
  selectorExpansionEnabled,
  selectorExpantsionMode,
} from "./useNavItemExpansion.selectors";
import resolveSelector from "@/UI/utils/resolveSelector";

/**
 * The expansion plugin to support the nav item expansion.
 *
 * @param store - The NavigationTreeView store.
 * @returns Expansion publicAPIs and instances.
 */
export default function useNavItemExpansion<OtherItemDef extends object = {}>(
  store: NavigationTreeViewStore<OtherItemDef>
): UseNavItemExpansionReturnValue<OtherItemDef> {
  type PublicAPI = UseNavItemExpansionPublicAPI<OtherItemDef>;
  type Instance = UseNavItemExpansionInstance<OtherItemDef>;

  const getExpanded = <
    ItemId extends string | null,
    OtherItemDef extends object,
  >(
    itemId: ItemId
  ) =>
    useSelector(store, selectorExpandedItems, itemId) as ItemId extends string
      ? NavigationTreeViewStateExpantionValue
      : ExpantionState<OtherItemDef>["expanded"];

  const getExpandable = <ItemId extends string | null>(itemId: ItemId) =>
    useSelector(
      store,
      selectorExpansionEnabled,
      itemId
    ) as ItemId extends string
      ? boolean
      : ExpantionState<OtherItemDef>["enabled"];

  const getExpansionMode: PublicAPI["getExpansionMode"] = () =>
    useSelector(store, selectorExpantsionMode);

  // instances ----------------------------------------------------
  const setItemExpansion: Instance["setItemExpansion"] = (itemId, updator) => {
    if (itemId)
      store.update((prevState) => {
        const newState = resolveSelector(
          updator,
          prevState.expansion.expanded[itemId]
        );
        const current = prevState.expansion.expanded[itemId]?.in;
        const expanded = newState?.in !== undefined ? newState?.in : !current;

        return {
          ...prevState,
          expansion: {
            ...prevState.expansion,
            expanded: {
              ...prevState.expansion.expanded,
              [itemId]: { in: expanded, anchorEl: newState?.anchorEl ?? null },
            },
          },
        };
      });
  };

  const setItemsExpansionRange: Instance["setItemsExpansionRange"] = (
    expansionRange
  ) => {
    if (expansionRange === null)
      expansionRange = selectorItemModel(store.state) as Record<
        string,
        Partial<NavigationTreeViewStateExpantionValue>
      >;

    Object.entries(expansionRange).map(([itemId, expandObj]) => {
      setItemExpansion(
        itemId,
        (expandObj?.in || expandObj?.anchorEl
          ? expandObj
          : {
              in: true,
              anchorEl: null,
            }) as NavigationTreeViewStateExpantionValue
      );
    });
  };

  const setExpansionMode: Instance["setExpansionMode"] = (mode) => {
    if (mode)
      store.update((prevState) => {
        const newMode = resolveSelector(mode, prevState.expansion.mode);

        return {
          ...prevState,
          expansion: {
            ...prevState.expansion,
            mode: newMode,
          },
        };
      });
  };

  const setExpansionEnabled: Instance["setExpansionEnabled"] = (
    itemId,
    updator
  ) => {
    if (itemId)
      store.update((prevState) => {
        const newState = resolveSelector(
          updator,
          prevState.expansion.enabled[itemId]
        );

        return {
          ...prevState,
          expansion: {
            ...prevState.expansion,
            enabled: {
              ...prevState.expansion.enabled,
              [itemId]: newState,
            },
          },
        };
      });
  };

  return {
    publicAPI: {
      getExpanded,
      getExpandable,
      getExpansionMode,
    },
    instance: {
      setItemExpansion,
      setItemsExpansionRange,
      setExpansionMode,
      setExpansionEnabled,
    },
  };
}

type ExpantionState<OtherItemDef extends object> =
  NavigationTreeViewState<OtherItemDef>["expansion"];

export interface UseNavItemExpansionPublicAPI<
  OtherItemDef extends object = {},
> {
  /**
   * Get the expanded item with the given id.
   * To get the root exapnded items, pass `null` as the `id`.
   * @param itemId The id of item.
   * @returns The expanded item with given id, or items.
   */
  getExpanded: <ItemId extends string | null>(
    itemId: ItemId
  ) => ItemId extends string
    ? NavigationTreeViewStateExpantionValue
    : ExpantionState<OtherItemDef>["expanded"];
  /**
   * Get expansion enabled.
   * To get the root expansion enabled items, pass `null` as the `id`.
   * @param itemId The id of item.
   * @returns The expansion item enabled with given id, or items expansion enabled object.
   */
  getExpandable: <ItemId extends string | null>(
    itemId: ItemId
  ) => ItemId extends string
    ? boolean
    : ExpantionState<OtherItemDef>["enabled"];
  /**
   * Get the mode of expansion.
   */
  getExpansionMode: () => ExpantionState<OtherItemDef>["mode"];
}

export interface UseNavItemExpansionInstance<OtherItemDef extends object = {}> {
  /**
   * Sets expant or unExpant of an item.
   *
   * @param {NavItemDef["id"]} itemId - The id of item.
   * @param updator - Optional override updator method to expant or unExpant.
   */
  setItemExpansion: (
    itemId: NavItemDef["id"],
    updator?:
      | Partial<NavigationTreeViewStateExpantionValue>
      | ((
          prevState: Partial<NavigationTreeViewStateExpantionValue>
        ) => Partial<NavigationTreeViewStateExpantionValue>)
    // expandObj?: Partial<NavigationTreeViewStateExpantionValue>
  ) => void;
  /**
   * Sets expand or unExpand for multiple items.
   * To expand all items, pass `null` as the `expansionRange`.
   * @param {Record<string, Partial<NavigationTreeViewStateExpantionValue>> | null} expansionRange - The expansionRange object.
   */
  setItemsExpansionRange: (
    expansionRange: Record<
      string,
      Partial<NavigationTreeViewStateExpantionValue>
    > | null
  ) => void;
  /**
   * Sets the mode of expansion.
   * @param mode - The mode of expansion, this can be a function.
   */
  setExpansionMode: (
    mode:
      | NavigationTreeViewState["expansion"]["mode"]
      | ((
          prevMode: NavigationTreeViewState["expansion"]["mode"]
        ) => NavigationTreeViewState["expansion"]["mode"])
  ) => void;
  /**
   * To enable or disable the item expansion.
   * @param updator - To enable or disable
   */
  setExpansionEnabled: (
    itemId: NavItemDef["id"],
    updator: boolean | ((prevState: boolean) => boolean)
  ) => void;
}

export interface UseNavItemExpansionReturnValue<
  OtherItemDef extends object = {},
> {
  publicAPI: UseNavItemExpansionPublicAPI<OtherItemDef>;
  instance: UseNavItemExpansionInstance<OtherItemDef>;
}
