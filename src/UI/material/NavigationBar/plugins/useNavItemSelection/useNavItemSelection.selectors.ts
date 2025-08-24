import { NavigationTreeViewState } from "../../NavigationTreeView/store";
import createSelector from "@/UI/utils/createSelector";

const selectorSelectionState = <OtherItemDef extends object>(
  state: NavigationTreeViewState<OtherItemDef>
) => state.selection;

/**
 * if itemId availabe.
 * - Check if an item is selected.
 *
 * if itemId = null.
 * - Get the selected items.
 * @param {NavigationTreeViewState<OtherItemDef>} state The state of the navigation tree view.
 * @param {string} itemId The id of item.
 * @returns {boolean} `true` if the item is selected, `false` otherwise, or item selected object.
 */
export const selectorItemsSelected = createSelector(
  [selectorSelectionState, (_, itemId: string | null = null) => itemId],
  <ItemId extends string | null, OtherItemDef extends object>(
    selectionState: NavigationTreeViewState<OtherItemDef>["selection"],
    itemId: ItemId
  ) =>
    typeof itemId === "string"
      ? selectionState.selected[itemId]
      : selectionState.selected
);

/**
 * if itemId availabe.
 * - Check if selection is enabled
 *
 * if itemId = null.
 * - Get the selection enabled items.
 * @param {NavigationTreeViewState<OtherItemDef>} state The state of the navigation tree view.
 * @returns {boolean} `true` if selection is enabled, `false` otherwise, or selection enabled object.
 */
export const selectorSelectionEnabled = createSelector(
  [selectorSelectionState, (_, itemId: string | null = null) => itemId],
  <ItemId extends string | null, OtherItemDef extends object>(
    selectionState: NavigationTreeViewState<OtherItemDef>["selection"],
    itemId: ItemId
  ) =>
    typeof itemId === "string"
      ? selectionState.enabled?.[itemId]
      : selectionState.enabled
);

/**
 * Get the mode of selection.
 * @param {NavigationTreeViewState<OtherItemDef>} state The state of the navigation tree view.
 * @returns {boolean} The selection mode.
 */
export const selectorSelectionMode = createSelector(
  [selectorSelectionState],
  (selectionState) => selectionState.mode
);
