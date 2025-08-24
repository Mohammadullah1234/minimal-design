import {
  NavigationBarItemThemeProps,
  NavigationBarOwnProps,
  NavItemDef,
} from "./types";

export const initialNavigationBarWidth: NavigationBarOwnProps["width"] = {
  compact: 90,
  standard: 240,
  comfortable: 300,
};

export const initialNavigationBarHeight: NavigationBarOwnProps["height"] = {
  compact: 50,
  standard: 60,
  comfortable: 70,
};

export const initialNavigationBarLocalStorageKeys: NavigationBarOwnProps["overrideLocalStorageKeys"] =
  {
    density: "rui-nav-density",
    orientation: "rui-nav-orientation",
  };

export const initialNavigationBarItemThemeProps: NavigationBarItemThemeProps = {
  item: null,
  caption: null,
  active: null,
  subActive: null,
  selected: null,
  subSelected: null,
  header: null,
  subBeforeLine: null,
  subItem: null,
  expanded: null,
  subExpanded: null,
  icon: {
    root: null,
    startIcon: null,
    endIcon: null,
    fontSize: 24,
  },
  gap: 4,
  rootHeight: 44,
  subHeight: 36,
  bulletSize: 12,
  spacing: 8,
  itemPT: 4,
  itemPR: 10,
  itemPB: 4,
  itemPL: 12,
};

export const initialNavItemProps: NavItemDef = {
  id: "item",
  variant: "item",
  startIcon: undefined,
  endIcon: undefined,
  href: undefined,
  disabled: undefined,
  disableIconOnDesktop: undefined,
  disableIconOnMobile: undefined,
  children: undefined,
  caption: undefined,
  element: undefined,
  component: undefined,
  external: true,
  selected: undefined,
  expanded: undefined,
  active: undefined,
  loading: undefined,
};
