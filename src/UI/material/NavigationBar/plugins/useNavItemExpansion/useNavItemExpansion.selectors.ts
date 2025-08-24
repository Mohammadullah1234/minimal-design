import { NavigationTreeViewState } from "../../NavigationTreeView/store";
import createSelector from "@/UI/utils/createSelector";

type ExpantionState<OtherItemDef extends object> =
  NavigationTreeViewState<OtherItemDef>["expansion"];

const selectorExpantionState = <OtherItemDef extends object>(
  state: NavigationTreeViewState<OtherItemDef>
) => state.expansion;

/**
 * if itemId availabe.
 * - Check if an item is expanded.
 *
 * if itemId = null.
 * - Get the expanded items.
 * @param {NavigationTreeViewState<OtherItemDef>} state The state of the navigation tree view.
 * @param {string} itemId The id of item.
 * @returns {boolean} expanded object if the item is expanded, `false` otherwise.
 */
export const selectorExpandedItems = createSelector(
  [selectorExpantionState, (_, itemId: string | null = null) => itemId],
  <ItemId extends string | null, OtherItemDef extends object>(
    expantionState: ExpantionState<OtherItemDef>,
    itemId?: ItemId
  ) =>
    typeof itemId === "string"
      ? expantionState.expanded[itemId]
      : expantionState.expanded
);

/**
 * Get the mode of expansion.
 * @param {NavigationTreeViewState<OtherItemDef>} state The state of the navigation tree view.
 * @returns {ExpantionState<OtherItemDef>["mode"]} the mode of expansion.
 */
export const selectorExpantsionMode = createSelector(
  [selectorExpantionState],
  (expantionState) => expantionState.mode
);

/**
 * if itemId availabe.
 * - Check if expansion is enabled
 *
 * if itemId = null.
 * - Get the expansion enabled items.
 * @param {NavigationTreeViewState<OtherItemDef>} state The state of the navigation tree view.
 * @returns {boolean} `true` if expansion is enabled, `false` otherwise, or expansion enabled object.
 */
export const selectorExpansionEnabled = createSelector(
  [selectorExpantionState, (_, itemId: string | null = null) => itemId],
  <ItemId extends string | null, OtherItemDef extends object>(
    expanstionState: NavigationTreeViewState<OtherItemDef>["expansion"],
    itemId: ItemId
  ) =>
    typeof itemId === "string"
      ? expanstionState.enabled[itemId]
      : expanstionState.enabled
);
