import generateUtilityClass from "@/UI/utils/generateUtilityClass";
import generateUtilityClasses from "@/UI/utils/generateUtilityClasses";

export interface NavItemClasses {
  /**
   * Styles applied to the root element.
   */
  root: string;
  /**
   * Styles applied to the root ul element.
   */
  root__ul: string;
  /**
   * Styles applied to the item container, if `variant="item"`.
   */
  item: string;
  /**
   * Styles applied to the selected item.
   */
  selected: string;
  /**
   * Styles applied to the expanded item.
   */
  expanded: string;
  /**
   * Styles applied to the active item.
   */
  active: string;
  /**
   * Styles applied to the disabled item.
   */
  disabled: string;
  /**
   * Styles applied to the link item.
   */
  link: string;
  /**
   * Styles applied to the item icons.
   */
  icon: string;
  /**
   * Styles applied to the item caption element.
   */
  caption: string;
  /**
   * Styles applied to the item startIcon.
   */
  startIcon: string;
  /**
   * Styles applied to the item endIcon.
   */
  endIcon: string;
  /**
   * Styles applied to the item collapse icon element.
   */
  collapseIcon: string;
  /**
   * Styles applied to the item caption info icon element.
   */
  captionInfoIcon: string;
  /**
   * Styles applied to the item element, if `variant="item"`.
   */
  element: string;
  /**
   * Styles applied to the item elementContainer, if `variant="item"`.
   */
  elementContainer: string;
  /**
   * Styles applied to the header container, if `variant="header"`.
   */
  header: string;
  /**
   * Styles applied to the transitionGroup root element.
   */
  transitionGroup: string;
  /**
   * Styles applied to the transitionGroup Papper component.
   *
   * Note: This class only applied when the NavItemTransitionGroup component `transitionGroup="popper"`.
   */
  transitionGroupPaper: string;
  /**
   * Styles applied to the itemsTransitionGroup root element, if `variant="item"`.
   */
  itemsTransitionGroup: string;
  /**
   * Styles applied to the headerTransitionGroup root element, `variant="header"`.
   */
  headerTransitionGroup: string;
  /**
   * Styles applied to the root element, if `loading={true}`.
   */
  loading: string;
  /**
   * Styles applied to the loadingWrapper element.
   */
  loadingWrapper: string;
}

export type NavItemClassKey = keyof NavItemClasses;

export function getNavItemUtilityClass(slot: string): string {
  return generateUtilityClass("RuiNavItem", slot);
}

const navItemClasses: NavItemClasses = generateUtilityClasses<NavItemClassKey>(
  "RuiNavItem",
  [
    "root",
    "root__ul",
    "item",
    "header",
    "selected",
    "expanded",
    "active",
    "disabled",
    "link",
    "icon",
    "caption",
    "startIcon",
    "endIcon",
    "collapseIcon",
    "captionInfoIcon",
    "element",
    "elementContainer",
    "transitionGroup",
    "transitionGroupPaper",
    "itemsTransitionGroup",
    "headerTransitionGroup",
    "loading",
    "loadingWrapper",
  ]
);

export default navItemClasses;
