"use client";

import { NavItemDef } from "../../types";
import NavigationTreeViewStore, {
  NavigationTreeViewState,
} from "../../NavigationTreeView/store";
import { selectorItemModel } from "../useNavItems/useNavItems.selectors";
import useSelector from "@/UI/hooks/useSelector";
import {
  selectorItemsSelected,
  selectorSelectionEnabled,
  selectorSelectionMode,
} from "./useNavItemSelection.selectors";
import resolveSelector from "@/UI/utils/resolveSelector";

/**
 * The selection plugin to support the nav item selection.
 *
 * @param store - The NavigationTreeView store.
 * @returns Selection publicAPIs and instances.
 */
export default function useNavItemSelection<OtherItemDef extends object>(
  store: NavigationTreeViewStore<OtherItemDef>
): UseNavItemSelectionReturnValue<OtherItemDef> {
  type PublicAPI = UseNavItemSelectionPublicAPI<OtherItemDef>;
  type Instance = UseNavItemSelectionInstance<OtherItemDef>;

  const getSelected = <
    ItemId extends string | null,
    OtherItemDef extends object,
  >(
    itemId: ItemId
  ) =>
    useSelector(store, selectorItemsSelected, itemId) as ItemId extends string
      ? boolean
      : SelectionState<OtherItemDef>["selected"];

  const getSelectable = <ItemId extends string | null>(itemId: ItemId) =>
    useSelector(
      store,
      selectorSelectionEnabled,
      itemId
    ) as ItemId extends string
      ? boolean
      : SelectionState<OtherItemDef>["enabled"];

  const getSelectionMode: PublicAPI["getSelectionMode"] = () =>
    useSelector(store, selectorSelectionMode);

  // instances ----------------------------------------------
  const setItemSelection: Instance["setItemSelection"] = (itemId, updator) => {
    if (itemId)
      store.update((prevState) => {
        const newSelected: Record<string, boolean> = {};

        const newState = resolveSelector(
          updator,
          prevState.selection.selected[itemId]
        );
        const select =
          newState !== undefined
            ? newState
            : !prevState.selection.selected[itemId];

        if (prevState.selection.mode === "multiple") {
          // Toggle multi-selection
          Object.assign(newSelected, prevState.selection.selected);
          if (newSelected[itemId]) {
            delete newSelected[itemId];
          } else {
            newSelected[itemId] = select;
          }
        } else {
          // Single selection
          newSelected[itemId] = select;
        }

        return {
          ...prevState,
          selection: {
            ...prevState.selection,
            selected: newSelected,
          },
        };
      });
  };

  const setItemsSelectionRange: Instance["setItemsSelectionRange"] = (
    selectionRange
  ) => {
    if (selectionRange === null)
      selectionRange = selectorItemModel(store.state) as Record<
        string,
        boolean
      >;

    Object.entries(selectionRange as object).map(([itemId, forceState]) => {
      setItemSelection(
        itemId,
        typeof forceState === "boolean" ? forceState : true
      );
    });
  };

  const setSelectionMode: Instance["setSelectionMode"] = (mode) => {
    if (mode)
      store.update((prevState) => {
        const newMode = resolveSelector(mode, prevState.selection.mode);

        return {
          ...prevState,
          selection: {
            ...prevState.selection,
            mode: newMode,
          },
        };
      });
  };

  const setSelectionEnabled: Instance["setSelectionEnabled"] = (
    itemId,
    updator
  ) => {
    if (itemId)
      store.update((prevState) => {
        const newState = resolveSelector(
          updator,
          prevState.selection.enabled[itemId]
        );

        return {
          ...prevState,
          selection: {
            ...prevState.selection,
            enabled: {
              ...prevState.selection.enabled,
              [itemId]: newState,
            },
          },
        };
      });
  };

  return {
    publicAPI: {
      getSelected,
      getSelectable,
      getSelectionMode,
    },
    instance: {
      setItemSelection,
      setItemsSelectionRange,
      setSelectionMode,
      setSelectionEnabled,
    },
  };
}

type SelectionState<OtherItemDef extends object> =
  NavigationTreeViewState<OtherItemDef>["selection"];

export interface UseNavItemSelectionPublicAPI<
  OtherItemDef extends object = {},
> {
  /**
   * Get the selected item with the given id.
   * To get the root selected items, pass `null` as the `id`.
   * @param itemId The id of item.
   * @returns The selected item with given id, or items.
   */
  getSelected: <ItemId extends string | null>(
    itemId: ItemId
  ) => ItemId extends string
    ? boolean
    : SelectionState<OtherItemDef>["selected"];
  /**
   * Get selection enabled.
   * To get the root selection enabled items, pass `null` as the `id`.
   * @param itemId The id of item.
   * @returns The selection item enabled with given id, or items selection enabled object.
   */
  getSelectable: <ItemId extends string | null>(
    itemId: ItemId
  ) => ItemId extends string
    ? boolean
    : SelectionState<OtherItemDef>["enabled"];
  /**
   * Get the mode of selection.
   */
  getSelectionMode: () => SelectionState<OtherItemDef>["mode"];
}

export interface UseNavItemSelectionInstance<OtherItemDef extends object = {}> {
  /**
   * Sets select or unSelect of an item.
   *
   * @param {NavItemDef["id"]} itemId - The id of item.
   * @param updator - Optional override updator method to select or unSelect.
   * @requires void
   */
  setItemSelection: (
    itemId: NavItemDef["id"],
    updator?: boolean | ((prevState: boolean) => boolean)
  ) => void;
  /**
   * Sets select or unSelect for multiple items.
   * To select all items, pass `null` as the `selectionRange`.
   * @param selectionRange - The selectionRange object.
   */
  setItemsSelectionRange: (
    selectionRange: Record<string, boolean> | null
  ) => void;
  /**
   * Sets the mode of selection.
   *
   * @param mode - The mode of selection, this can be a function.
   */
  setSelectionMode: (
    mode:
      | NavigationTreeViewState["selection"]["mode"]
      | ((
          prevMode: NavigationTreeViewState["selection"]["mode"]
        ) => NavigationTreeViewState["selection"]["mode"])
  ) => void;
  /**
   * To enable or disable the item selection.
   * @param updator - To enable or disable
   */
  setSelectionEnabled: (
    itemId: NavItemDef["id"],
    updator: boolean | ((prevState: boolean) => boolean)
  ) => void;
}

export interface UseNavItemSelectionReturnValue<
  OtherItemDef extends object = {},
> {
  publicAPI: UseNavItemSelectionPublicAPI<OtherItemDef>;
  instance: UseNavItemSelectionInstance<OtherItemDef>;
}
