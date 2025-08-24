import * as React from "react";
import { SwipeableDrawerProps } from "@mui/material/SwipeableDrawer";
import { SxProps, Theme } from "@/UI/styles/MuiStyles";
import { StackProps } from "@/UI/material/Stack";
import { NavItemProps, NavItemRootProps } from "../components";
import { CreateSlotsAndSlotProps, SlotProps } from "@/UI/material/utils";
import {
  NavItemDef,
  NavItemDefPublicModelProperties,
  NavItemDefSlotsAndSlotProps,
  NavItemDefStatus,
} from "./NavItem.types";
import { NavigationBarClasses } from "../navigationBarClasses";
import {
  NavigationTreeViewOwnProps,
  NavigationTreeViewProps,
} from "../NavigationTreeView";
import { IconButtonProps } from "../../IconButton";
import { ContainerProps } from "@mui/material/Container";

export type NavigationBarSlots<OtherItemDef extends object = {}> = {
  /**
   * The component that renders the `root` slot.
   * @default "div"
   */
  root: React.ElementType;
  /**
   * The component that renders the `rootHorizontalContainer` slot, if `orientation="horizontal"`.
   * @default "div"
   */
  rootHorizontalContainer: React.ElementType;
  /**
   * The component that renders the `rootNav` slot.
   * @default "div"
   */
  rootNav: React.ElementType;
  /**
   * The component that renders the `layout` slot.
   * @default "div"
   */
  layout: React.ElementType;
  /**
   * The component that renders the `main` slot.
   * @default "div"
   */
  main: React.ElementType;
  /**
   * The component that renders the `mainContainer` slot, where children is rendered.
   * @default Container
   */
  mainContainer: React.ElementType;
  /**
   * The component that renders the TreeView slot.
   * @default NavigationTreeView
   */
  treeView: React.JSXElementConstructor<NavigationTreeViewProps<OtherItemDef>>;
  /**
   * The component that renders the item slot.
   * @default NavTreeItem
   */
  item: React.JSXElementConstructor<NavItemProps>;
  /**
   * The component that renders the toggleDensityButton slot.
   * @default IconButton
   */
  toggleDensityButton: React.ElementType;
  /**
   * The component that renders the headerSection slot.
   * @default Stack
   */
  headerSection: React.ElementType;
  /**
   * The component that renders the footerSection slot.
   * @default Stack
   */
  footerSection: React.ElementType;
  /**
   * The component that renders the swip `Menu` slot.
   * @default SwipeableDrawer
   */
  swipeableDrawer: React.ElementType;
};

type NavigationBarItemDefSlotProps = NavItemDefPublicModelProperties &
  NavItemDefSlotsAndSlotProps;

export type NavigationBarSlotProps<OtherItemDef extends object = {}> = {
  /**
   * Props forwarded to the `root` component. By default, the avaible props are based on the `root` component.
   */
  root: StackProps;
  /**
   * Props forwarded to the `rootHorizontalContainer` component, if `orientation="horizontal"`. By default, the avaible props are based on the `rootHorizontalContainer` component.
   */
  rootHorizontalContainer: SlotProps<"div">;
  /**
   * Props forwarded to the `rootNav` component. By default, the avaible props are based on the `rootNav` component.
   */
  rootNav: SlotProps<"div">;
  /**
   * Props forwarded to the `layout` component. By default, the avaible props are based on the `layout` component.
   */
  layout: SlotProps<"div">;
  /**
   * Props forwarded to the `main` component. By default, the avaible props are based on the `main` component.
   */
  main: SlotProps<"div">;
  /**
   * Props forwarded to the `mainContainer` component, where children is rendered. By default, the avaible props are based on the `mainContainer` component.
   */
  mainContainer: ContainerProps;
  /**
   * Props forwarded to the `NavigationTreeView` component. By default, the avaible props are based on the `NavigationTreeView` component.
   */
  treeView: Omit<NavigationTreeViewProps<OtherItemDef>, "items">;
  /**
   * Props forwarded to nav item `root` li element. By default, the avaible props are based on the `root` element.
   */
  item: NavItemRootProps;
  /**
   * The itemDef prop use the define some public props for all nav items.
   *
   * @param {UseNavigationBarReturnValue} props - Get the navigationBar props.
   * @param {NavItemDef<OtherItemDef>} item - Get all props of each item.
   * @param {NavItemDefStatus} status - Get status of each item.
   * @returns Forward the props to all items.
   */
  itemDef:
    | NavigationBarItemDefSlotProps
    | ((
        item: NavItemDef<OtherItemDef>,
        status: NavItemDefStatus
      ) => NavigationBarItemDefSlotProps);
  /**
   * Props forwarded to the navigationBar toggleDensityButton component. By default, the avaible props are based on the toggleDensityButton component.
   */
  toggleDensityButton: IconButtonProps;
  /**
   * Props forwarded to the navigationBar headerSection component. By default, the avaible props are based on the headerSection component.
   */
  headerSection: StackProps;
  /**
   * Props forwarded to the navigationBar end footerSection. By default, the avaible props are based on the end footerSection.
   */
  footerSection: StackProps;
  /**
   * Props forwarded to the `SwipeableDrawer` component. By default, the avaible props are based on the end `SwipeableDrawer` component.
   */
  swipeableDrawer: Omit<SwipeableDrawerProps, "open" | "onClose" | "onOpen">;
};

export type NavigationBarSlotsAndSlotProps<OtherItemDef extends object = {}> =
  CreateSlotsAndSlotProps<
    NavigationBarSlots<OtherItemDef>,
    NavigationBarSlotProps,
    NavigationBarOwnerState<OtherItemDef>
  >;

export type NavigationBarItemThemeProps = {
  /**
   * Styles applied on `header` items, if `variant='header'`.
   */
  header: SxProps<Theme>;
  /**
   * Styles applied on each item, if `variant='item'`.
   */
  item: SxProps<Theme>;
  /**
   * Styles applied on sub items.
   */
  subItem: SxProps<Theme>;
  /**
   * Styles applied on caption for each item.
   */
  caption: SxProps<Theme>;
  /**
   * Styles applied on root `active` for each item.
   */
  active: SxProps<Theme>;
  /**
   * Styles applied on sub items, when `active`.
   */
  subActive: SxProps<Theme>;
  /**
   * Styles applied on when `selected`, for each item.
   */
  selected: SxProps<Theme>;
  /**
   * Styles applied on sub items, when `selected`.
   */
  subSelected: SxProps<Theme>;
  /**
   * Styles applied on when `expanded`, for each item.
   */
  expanded: SxProps<Theme>;
  /**
   * Styles applied on sub items, when `expanded`.
   */
  subExpanded: SxProps<Theme>;
  /**
   * Styles applied on sub root before line.
   */
  subBeforeLine: SxProps<Theme>;
  /**
   * Styles applied on `icon` for each item.
   */
  icon: {
    /**
     * Styles applied on `root`.
     */
    root?: SxProps<Theme>;
    /**
     * Styles applied on `startIcon`.
     */
    startIcon?: SxProps<Theme>;
    /**
     * Styles applied on `endIcon`.
     */
    endIcon?: SxProps<Theme>;
    /**
     * Defines the icon font size for each item.
     * @default 24
     * ```txt
     * Note: the value automaticly converts to rem.
     */
    fontSize?: number;
  };
  /**
   * Defines the gap between items.
   * @default 4
   */
  gap: number;
  /**
   * Defines the item root height.
   * @default 44
   */
  rootHeight: number;
  /**
   * Defines the item sub height.
   * @default 36
   */
  subHeight: number;
  /**
   * Defines the bulletSize for items or item collapse.
   * @default 14
   */
  bulletSize: number;
  /**
   * Defines the spacing for items.
   * @default 8
   */
  spacing: number;
  /**
   * Defines the `paddingTop` for item.
   * @default 4
   */
  itemPT: number;
  /**
   * Defines the `paddingRight` for item.
   * @default 10
   */
  itemPR: number;
  /**
   * Defines the `paddingBottom` for item.
   * @default 4
   */
  itemPB: number;
  /**
   * Defines the `paddingLeft` for item.
   * @default 12
   */
  itemPL: number;
};

export interface NavigationBarOwnerState<OtherItemDef extends object = {}>
  extends Pick<NavigationTreeViewOwnProps<OtherItemDef>, "items"> {
  /**
   * Defines the orientation of NavigationBar component.
   *
   * This saves in localStorage on "rui-nav-orientation" name.
   * @default 'vertical'
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Sets the density of the NavigationBar.
   *
   * This saves in localStorage on "rui-nav-density" name.
   * @default "comfortable"
   */
  density?: "compact" | "standard" | "comfortable";
  /**
   * Defines the `vertical` width for the NavigationBar.
   * @default initialNavigationBarWidth 
   * {
   *    compact: 90,
        standard: 240,
        comfortable: 300,
      }
   */
  width?: Partial<
    Record<Required<NavigationBarOwnerState<OtherItemDef>>["density"], number>
  >;
  /**
   * Defines the `horizontal` height for the NavigationBar.
   * @default initialNavigationBarWidth 
   * {
   *    compact: 90,
        standard: 240,
        comfortable: 300,
      }
   */
  height?: Partial<
    Record<Required<NavigationBarOwnerState<OtherItemDef>>["density"], number>
  >;
  /**
   * The headerContainer renders at the top-right of NavigationBar component, if orientation="vertical".
   * otherwise it renders at the top level.
   * @default null
   */
  headerContainer?: React.ElementType | null;
  /**
   * Defines the headerSection at the start.
   */
  headerSection?: React.ReactNode;
  /**
   * Defines the footerSection at the end.
   */
  footerSection?: React.ReactNode;
  /**
   * The `itemTheme` prop use to customize nav item components.
   */
  itemTheme?: Partial<NavigationBarItemThemeProps>;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<NavigationBarClasses>;
  /**
   * The `usePathname` hook to support the current path.
   * it must be provided.
   *
   * @example - 1
   * ```tsx
   * // for next router or navigation:
   * import { usePathname } from "next/navigation";
   * <NavigationBar usePathname={usePathname} />
   * ```
   *
   * @example - 2
   * ```tsx
   * // for react router dom.
   * import { useLocation } from "react-router-dom";
   * <NavigationBar usePathname={() => useLocation().pathName} />
   */
  usePathname: () => string;
  /**
   * Overrides the initial nav localStorage keys.
   * @default initialNavigationBarLocalStorageKeys
   * {
        density: "rui-nav-density",
        orientation: "rui-nav-orientation",
      }
   */
  overrideLocalStorageKeys?: {
    density?: string;
    orientation?: string;
  };
  /**
   * Sets the default mobileMode query.
   *
   * @param theme - The mui theme.
   * @default (theme) => theme.breakpoints.down("lg")
   */
  mobileModeQuery?: (theme: Theme) => string;
  children?: React.ReactNode;
  /**
   * If it's true, the sub headers will not be rendered.
   * @default false
   */
  hideSubHeader?: boolean;
  /**
   * If it's true, the toggle density button will not be rendered.
   * @default false
   */
  disableToggleDensityButton?: boolean;
  /**
   * If it's true, the default NavigationBar data will not be saved in localStorgage.
   * @default false
   */
  disableStoringDataInLocalStorage?: boolean;
  /**
   * If it's true, the default mobile operations will be disabled on mobile.
   *
   * By default the `NavigationBar` component automaticly performs the following operations on mobile mode.
   *
   * - The `orientation` converts to "comfortable".
   * - The `density` converts to "comfortable".
   * - The `toggleDensityButton` will be disabled.
   *
   * These operations will be disabled, if it's true.
   * @default false
   */
  disableAutoOperationsOnMobileMode?: boolean;
}

export interface NavigationBarOwnProps<OtherItemDef extends object = {}>
  extends NavigationBarSlotsAndSlotProps<OtherItemDef>,
    NavigationBarOwnerState<OtherItemDef> {
  /**
   * If `true`, the drawer is shown, in mobile mode.
   *
   * This prop forward to the `SwipeableDrawer` component.
   * @default false
   */
  open?: boolean;
  /**
   * Callback fired when the component requests to be opened.
   *
   * This prop forward to the `SwipeableDrawer` component.
   *
   * @param {React.SyntheticEvent<{}>} event The event source of the callback.
   */
  onOpen?: React.ReactEventHandler<{}>;
  /**
   * Callback fired when the component requests to be closed.
   *
   * This prop forward to the `SwipeableDrawer` component.
   *
   * @param {React.SyntheticEvent<{}>} event The event source of the callback.
   */
  onClose?: React.ReactEventHandler<{}>;
}

export interface NavigationBarProps<OtherItemDef extends object = {}>
  extends NavigationBarOwnProps<OtherItemDef> {}
