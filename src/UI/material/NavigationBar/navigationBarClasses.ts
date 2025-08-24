import generateUtilityClass from "@/UI/utils/generateUtilityClass";
import generateUtilityClasses from "@/UI/utils/generateUtilityClasses";

export type NavigationBarClasses = {
  /**
   * Styles applied to the root element.
   */
  root: string;
  /**
   * Styles applied to the rootHorizontalContainer, if `orientation="horizontal"`..
   */
  rootHorizontalContainer: string;
  /**
   * Styles applied to the rootNav container.
   */
  rootNav: string;
  /**
   * Styles applied to the layout container.
   */
  layout: string;
  /**
   * Styles applied to the main element.
   */
  main: string;
  /**
   * Styles applied to the main container component, where children is rendered.
   */
  mainContainer: string;
  /**
   * Styles applied to the nav items container.
   */
  navItemsContainer: string;
  /**
   * Styles applied to the container element.
   */
  container: string;
  /**
   * Styles applied to the treeView component.
   */
  treeView: string;
  /**
   * Styles applied on both sections, `headerSection` & `footerSection`.
   */
  section: string;
  /**
   * Styles applied to the headerSection.
   */
  headerSection: string;
  /**
   * Styles applied to the footerSection.
   */
  footerSection: string;
  /**
   * Styles applied to the SwipeableDrawer component.
   */
  swipeableDrawer: string;
  /**
   * Styles applied to the toggleDensityButton component.
   */
  toggleDensityButton: string;
};

export type NavigationBarClassKey = keyof NavigationBarClasses;

export function getNavigationBarUtilityClass(slot: string): string {
  return generateUtilityClass("RuiNav", slot);
}

const navigationBarClasses: NavigationBarClasses =
  generateUtilityClasses<NavigationBarClassKey>("RuiNav", [
    "root",
    "rootHorizontalContainer",
    "rootNav",
    "layout",
    "main",
    "mainContainer",
    "navItemsContainer",
    "container",
    "treeView",
    "section",
    "headerSection",
    "footerSection",
    "swipeableDrawer",
    "toggleDensityButton",
  ]);

export default navigationBarClasses;
