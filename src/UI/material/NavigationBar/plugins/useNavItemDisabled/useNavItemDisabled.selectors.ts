import createSelector from "@/UI/utils/createSelector";
import { NavigationTreeViewState } from "../../NavigationTreeView/store";
import { NavItemDef } from "../../types";

const selectorDisabledState = <OtherItemDef extends object>(
  state: NavigationTreeViewState<OtherItemDef>
) => state.disabled;

/**
 * if itemId availabe.
 * - Check if an item is disabled.
 *
 * if itemId = null.
 * - Get the disabled items.
 * @param {NavigationTreeViewState<OtherItemDef>} state The state of the navigation tree view.
 * @param {string} itemId The id of item.
 * @returns {boolean} `true` if the item is disabled, `false` otherwise.
 */
export const selectorDisabledItems = createSelector(
  [selectorDisabledState, (_, itemId: string | null = null) => itemId],
  <ItemId extends NavItemDef["id"] | null, OtherItemDef extends object>(
    disabledState: NavigationTreeViewState<OtherItemDef>["disabled"],
    itemId: ItemId
  ) => (typeof itemId === "string" ? disabledState[itemId] : disabledState)
);
