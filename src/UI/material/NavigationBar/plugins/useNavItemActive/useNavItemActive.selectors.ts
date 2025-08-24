import createSelector from "@/UI/utils/createSelector";
import { NavigationTreeViewState } from "../../NavigationTreeView/store";
import { NavItemDef } from "../../types";

const selectorActiveItemsState = <OtherItemDef extends object>(
  state: NavigationTreeViewState<OtherItemDef>
) => state.active;

/**
 * if itemId availabe.
 * - Check if an item is active.
 *
 * if itemId = null.
 * - Get the active items.
 * @param {NavigationTreeViewState<OtherItemDef>} state The state of the navigation tree view.
 * @param {string} itemId The id of item.
 * @returns {boolean} `true` if the item is active, `false` otherwise.
 */
export const selectorActiveItems = createSelector(
  [selectorActiveItemsState, (_, itemId: string | null = null) => itemId],
  <ItemId extends NavItemDef["id"] | null, OtherItemDef extends object>(
    activeState: NavigationTreeViewState<OtherItemDef>["active"],
    itemId: ItemId
  ) => (typeof itemId === "string" ? activeState[itemId] : activeState)
);
