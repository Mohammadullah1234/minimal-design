import useNavItems from "../plugins/useNavItems";
import useNavItemExpansion from "../plugins/useNavItemExpansion";
import useNavItemSelection from "../plugins/useNavItemSelection";
import useNavItemActive from "../plugins/useNavItemActive";
import useNavItemDisabled from "../plugins/useNavItemDisabled";
import useNavItemLoading from "../plugins/useNavItemLoading";

export const NAVIGATION_TREE_VIEW_PLUGINS = [
  useNavItems,
  useNavItemExpansion,
  useNavItemSelection,
  useNavItemActive,
  useNavItemDisabled,
  useNavItemLoading,
];
