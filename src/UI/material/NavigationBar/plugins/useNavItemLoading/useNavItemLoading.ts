"use client";

import useSelector from "@/UI/hooks/useSelector";
import NavigationTreeViewStore, {
  NavigationTreeViewState,
} from "../../NavigationTreeView/store";
import { NavItemDef } from "../../types";
import { selectorItemModel } from "../useNavItems";
import { selectorLoadingItems } from "./useNavItemLoading.selectors";
import resolveSelector from "@/UI/utils/resolveSelector";

/**
 * The loading item plugin to support the nav item loading item.
 *
 * @param store - The NavigationTreeView store.
 * @returns Loading item publicAPIs and instances.
 */
export default function useNavItemLoading<OtherItemDef extends object = {}>(
  store: NavigationTreeViewStore<OtherItemDef>
): UseNavItemLoadingReturnValue<OtherItemDef> {
  type Instance = UseNavItemLoadingInstance<OtherItemDef>;

  const getLoading = <ItemId extends NavItemDef["id"] | null>(itemId: ItemId) =>
    useSelector(store, selectorLoadingItems, itemId) as ItemId extends string
      ? boolean
      : LoadingState<OtherItemDef>;

  // instances ----------------------------------------------
  const setItemLoading: Instance["setItemLoading"] = (itemId, updator) => {
    if (itemId)
      store.update((prevState) => {
        const newState = resolveSelector(updator, prevState.loading[itemId]);

        return {
          ...prevState,
          loading: {
            ...prevState.loading,
            [itemId]:
              newState !== undefined ? newState : !prevState.loading[itemId],
          },
        };
      });
  };

  const setItemsLoadingRange: Instance["setItemsLoadingRange"] = (
    loadingRange
  ) => {
    if (loadingRange === null)
      loadingRange = selectorItemModel(
        store.state
      ) as LoadingState<OtherItemDef>;

    Object.entries(loadingRange).map(([itemId, forceState]) => {
      setItemLoading(
        itemId,
        typeof forceState === "boolean" ? forceState : true
      );
    });
  };

  return {
    publicAPI: { getLoading },
    instance: { setItemLoading, setItemsLoadingRange },
  };
}

type LoadingState<OtherItemDef extends object> =
  NavigationTreeViewState<OtherItemDef>["loading"];

export interface UseNavItemLoadingPublicAPI<OtherItemDef extends object = {}> {
  /**
   * Get the loading item with the given id.
   * To get the root loading items, pass `null` as the `id`.
   * @param itemId The id of item.
   * @returns The loading item with given id, or items.
   */
  getLoading: <ItemId extends NavItemDef["id"] | null>(
    itemId: ItemId
  ) => ItemId extends string ? boolean : LoadingState<OtherItemDef>;
}

export interface UseNavItemLoadingInstance<OtherItemDef extends object = {}> {
  /**
   * Sets to toggle loading of an item.
   *
   * @param {NavItemDef["id"]} itemId - The id of item.
   * @param {boolean} updator - Optional override updator method to toggle loading.
   */
  setItemLoading: (
    itemId: NavItemDef["id"],
    updator?: boolean | ((prevState: boolean) => boolean)
  ) => void;
  /**
   * Sets to toggle loading for multiple items.
   * To loading all items, pass `null` as the `loadingRange`.
   * @param {LoadingState<OtherItemDef> | null} loadingRange - The loadingRange object.
   */
  setItemsLoadingRange: (
    loadingRange: LoadingState<OtherItemDef> | null
  ) => void;
}

export interface UseNavItemLoadingReturnValue<
  OtherItemDef extends object = {},
> {
  publicAPI: UseNavItemLoadingPublicAPI<OtherItemDef>;
  instance: UseNavItemLoadingInstance<OtherItemDef>;
}
