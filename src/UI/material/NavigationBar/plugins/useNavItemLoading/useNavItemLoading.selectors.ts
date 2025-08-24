import createSelector from "@/UI/utils/createSelector";
import { NavigationTreeViewState } from "../../NavigationTreeView/store";
import { NavItemDef } from "../../types";

const selectorLoadingState = <OtherItemDef extends object>(
  state: NavigationTreeViewState<OtherItemDef>
) => state.loading;

/**
 * if itemId availabe.
 * - Check if an item is loading.
 *
 * if itemId = null.
 * - Get the loading items.
 * @param {NavigationTreeViewState<OtherItemDef>} state The state of the navigation tree view.
 * @param {string} itemId The id of item.
 * @returns {boolean} `true` if the item is loading, `false` otherwise.
 */
export const selectorLoadingItems = createSelector(
  [selectorLoadingState, (_, itemId: string | null = null) => itemId],
  <ItemId extends NavItemDef["id"] | null, OtherItemDef extends object>(
    loadingState: NavigationTreeViewState<OtherItemDef>["loading"],
    itemId: ItemId
  ) => (typeof itemId === "string" ? loadingState[itemId] : loadingState)
);
