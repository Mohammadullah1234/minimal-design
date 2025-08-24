"use client";

import useSelector from "@/UI/hooks/useSelector";
import NavigationTreeViewStore, {
  NavigationTreeViewState,
} from "../../NavigationTreeView/store";
import { selectorActiveItems } from "./useNavItemActive.selectors";
import { NavItemDef } from "../../types";
import { selectorItemModel } from "../useNavItems";
import resolveSelector from "@/UI/utils/resolveSelector";

/**
 * The active item plugin to support the nav item active item.
 *
 * @param store - The NavigationTreeView store.
 * @returns Active item publicAPIs and instances.
 */
export default function useNavItemActive<OtherItemDef extends object = {}>(
  store: NavigationTreeViewStore<OtherItemDef>
): UseNavItemActiveReturnValue<OtherItemDef> {
  type Instance = UseNavItemActiveInstance<OtherItemDef>;

  const getActive = <ItemId extends NavItemDef["id"] | null>(itemId: ItemId) =>
    useSelector(store, selectorActiveItems, itemId) as ItemId extends string
      ? boolean
      : ActiveState<OtherItemDef>;

  // instances ----------------------------------------------
  const setItemActive: Instance["setItemActive"] = (itemId, updator) => {
    if (itemId)
      store.update((prevState) => {
        const newState = resolveSelector(updator, prevState.active[itemId]);

        return {
          ...prevState,
          active: {
            ...prevState.active,
            [itemId]:
              newState !== undefined ? newState : !prevState.active[itemId],
          },
        };
      });
  };

  const setItemsActiveRange: Instance["setItemsActiveRange"] = (
    activeRange
  ) => {
    if (activeRange === null)
      activeRange = selectorItemModel(store.state) as ActiveState<OtherItemDef>;

    Object.entries(activeRange).map(([itemId, forceState]) => {
      setItemActive(
        itemId,
        typeof forceState === "boolean" ? forceState : true
      );
    });
  };

  return {
    publicAPI: { getActive },
    instance: { setItemActive, setItemsActiveRange },
  };
}

type ActiveState<OtherItemDef extends object> =
  NavigationTreeViewState<OtherItemDef>["active"];

export interface UseNavItemActivePublicAPI<OtherItemDef extends object = {}> {
  /**
   * Get the active item with the given id.
   * To get the root active items, pass `null` as the `id`.
   * @param itemId The id of item.
   * @returns The active item with given id, or items.
   */
  getActive: <ItemId extends NavItemDef["id"] | null>(
    itemId: ItemId
  ) => ItemId extends string ? boolean : ActiveState<OtherItemDef>;
}

export interface UseNavItemActiveInstance<OtherItemDef extends object = {}> {
  /**
   * Sets active or unActive of an item.
   *
   * @param {NavItemDef["id"]} itemId - The id of item.
   * @param {boolean | ((prevState: boolean) => boolean)} updator - Optional override updator method to active or unActive.
   * @requires void
   */
  setItemActive: (
    itemId: NavItemDef["id"],
    updator?: boolean | ((prevState: boolean) => boolean)
  ) => void;
  /**
   * Sets active or unActive for multiple items.
   * To active all items, pass `null` as the `activeRange`.
   * @param {ActiveState<OtherItemDef> | null} activeRange - The activeRange object.
   */
  setItemsActiveRange: (activeRange: ActiveState<OtherItemDef> | null) => void;
}

export interface UseNavItemActiveReturnValue<OtherItemDef extends object = {}> {
  publicAPI: UseNavItemActivePublicAPI<OtherItemDef>;
  instance: UseNavItemActiveInstance<OtherItemDef>;
}
