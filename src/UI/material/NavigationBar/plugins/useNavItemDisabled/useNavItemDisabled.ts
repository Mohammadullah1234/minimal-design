"use client";

import useSelector from "@/UI/hooks/useSelector";
import NavigationTreeViewStore, {
  NavigationTreeViewState,
} from "../../NavigationTreeView/store";
import { NavItemDef } from "../../types";
import { selectorItemModel } from "../useNavItems";
import { selectorDisabledItems } from "./useNavItemDisabled.selectors";
import resolveSelector from "@/UI/utils/resolveSelector";

/**
 * The disabled item plugin to support the nav item disabled item.
 *
 * @param store - The NavigationTreeView store.
 * @returns Disabled item publicAPIs and instances.
 */
export default function useNavItemDisabled<OtherItemDef extends object = {}>(
  store: NavigationTreeViewStore<OtherItemDef>
): UseNavItemDisabledReturnValue<OtherItemDef> {
  type Instance = UseNavItemDisabledInstance<OtherItemDef>;

  const getDisabled = <ItemId extends NavItemDef["id"] | null>(
    itemId: ItemId
  ) =>
    useSelector(store, selectorDisabledItems, itemId) as ItemId extends string
      ? boolean
      : DisabledState<OtherItemDef>;

  // instances ----------------------------------------------
  const setItemDisabled: Instance["setItemDisabled"] = (itemId, updator) => {
    if (itemId)
      store.update((prevState) => {
        const newState = resolveSelector(updator, prevState.disabled[itemId]);

        return {
          ...prevState,
          disabled: {
            ...prevState.disabled,
            [itemId]:
              newState !== undefined ? newState : !prevState.disabled[itemId],
          },
        };
      });
  };

  const setItemsDisabledRange: Instance["setItemsDisabledRange"] = (
    disabledRange
  ) => {
    if (disabledRange === null)
      disabledRange = selectorItemModel(
        store.state
      ) as DisabledState<OtherItemDef>;

    Object.entries(disabledRange).map(([itemId, forceState]) => {
      setItemDisabled(
        itemId,
        typeof forceState === "boolean" ? forceState : true
      );
    });
  };

  return {
    publicAPI: { getDisabled },
    instance: { setItemDisabled, setItemsDisabledRange },
  };
}

type DisabledState<OtherItemDef extends object> =
  NavigationTreeViewState<OtherItemDef>["disabled"];

export interface UseNavItemDisabledPublicAPI<OtherItemDef extends object = {}> {
  /**
   * Get the disabled item with the given id.
   * To get the root disabled items, pass `null` as the `id`.
   * @param itemId The id of item.
   * @returns The disabled item with given id, or items.
   */
  getDisabled: <ItemId extends NavItemDef["id"] | null>(
    itemId: ItemId
  ) => ItemId extends string ? boolean : DisabledState<OtherItemDef>;
}

export interface UseNavItemDisabledInstance<OtherItemDef extends object = {}> {
  /**
   * Sets to toggle disable of an item.
   *
   * @param {NavItemDef["id"]} itemId - The id of item.
   * @param {boolean} updator - Optional override updator method to toggle disable.
   * @requires void
   */
  setItemDisabled: (
    itemId: NavItemDef["id"],
    updator?: boolean | ((prevState: boolean) => boolean)
  ) => void;
  /**
   * Sets to toggle disable for multiple items.
   * To disable all items, pass `null` as the `disabledRange`.
   * @param {DisabledState<OtherItemDef> | null} disabledRange - The disabledRange object.
   */
  setItemsDisabledRange: (
    disabledRange: DisabledState<OtherItemDef> | null
  ) => void;
}

export interface UseNavItemDisabledReturnValue<
  OtherItemDef extends object = {},
> {
  publicAPI: UseNavItemDisabledPublicAPI<OtherItemDef>;
  instance: UseNavItemDisabledInstance<OtherItemDef>;
}
