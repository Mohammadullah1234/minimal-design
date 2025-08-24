import * as React from "react";
import { ButtonBaseProps } from "@/UI/material/ButtonBase";
import {
  NavItemCaptionProps,
  NavItemCollapseIconProps,
  NavItemContainerProps,
  NavItemIconProps,
  NavItemTransitionGroupProps,
} from "../components";
import { CreateSlotsAndSlotProps } from "@/UI/material/utils";

export type NavItemComponentProps<
  RootComponent extends React.ElementType = "div",
  AdditionalProps = {},
> = ButtonBaseProps<RootComponent, AdditionalProps>;

export type NavItemDefSlots = {
  /**
   * The component that renders the item slot, if the `variant="item"`.
   * @default ButtonBase
   */
  item: React.ElementType;
  /**
   * The component that renders the header slot, if the `variant="header"`.
   * @default ButtonBase
   */
  header: React.ElementType;
  /**
   * The component that renders the `caption` slot.
   * @default span
   */
  caption: React.ElementType;
  /**
   * The component that renders the startIcon `icon` slot.
   * @default ItemIcon
   */
  startIcon: React.ElementType;
  /**
   * The component that renders the endIcon `icon` slot.
   * @default ItemIcon
   */
  endIcon: React.ElementType;
  /**
   * The component that renders the collapse icon slot.
   * @default NavItemIcon
   */
  collapseIcon: React.ElementType;
};

export type NavItemDefSlotProps = {
  /**
   * Props forwarded to the `item` components, if the variant="item".
   */
  item: NavItemContainerProps;
  /**
   * Props forwarded to the `header` components, if the variant="header".
   */
  header: NavItemContainerProps;
  /**
   * Props forwarded to the item `caption` component. By default, the avaible props are based on the item `caption` component.
   */
  caption: NavItemCaptionProps;
  /**
   * Props forwarded to start `ItemIcon` component. By default, the avaible props are based on the `ItemIcon` component.
   */
  startIcon: NavItemIconProps;
  /**
   * Props forwarded to end `ItemIcon` component. By default, the avaible props are based on the `ItemIcon` component.
   */
  endIcon: NavItemIconProps;
  /**
   * Props forwarded to collapse `icon` component. By default, the avaible props are based on the `icon` component.
   */
  collapseIcon: NavItemCollapseIconProps;
  /**
   * Props forwarded to transitionGroup root component. By default, the avaible props are based on the transitionGroup root component.
   */
  transitionGroup: NavItemTransitionGroupProps;
};

export type NavItemDefSlotsAndSlotProps = CreateSlotsAndSlotProps<
  NavItemDefSlots,
  NavItemDefSlotProps
>;

/**
 * NavItemDefStatus use for nav item status props.
 */
export type NavItemDefStatus = {
  /**
   * The prop use for, if the item is `active`.
   */
  isActive: boolean;
  /**
   * The prop use for, if the item is `expanded`.
   */
  isExpanded: boolean;
  /**
   * The prop use for, if the item is `selected`.
   */
  isSelected: boolean;
  /**
   * The prop use for, if the item `component="a"` or has `href` prop.
   */
  isLink: boolean;
  /**
   * The prop use for, if the item is `disabled`.
   */
  isDisabled: boolean;
  /**
   * The prop use for, when the item is loading.
   */
  isLoading: boolean;
  /**
   * The prop use for, if the item has `external` href.
   */
  isExternalLink: boolean;
};

export type NavItemDefPrivateModelProperties = {
  /**
   * Defines the id of each item.
   * The id must be unique.
   */
  id: string;
  /**
   * Optional parentId if not provided, it will be generated.
   */
  parentId?: string;
  /**
   * Defines the variant of item.
   * @default "item"
   */
  variant?: "header" | "item";
  /**
   * Defines the type of item.
   * @default "root"
   * 
   * @example
   * 
   * ```ts
   * {
   *    id: "user",
        element: "User",
        href: "/user",
        startIcon: <User />,
        children: [
            {
              id: "user-profile",
              element: "Profile",
              href: "/profile",
              type: "sub", // defines type for sub items
            },
            {
              id: "user-cards",
              element: "Cards",
              href: "/cards",
              type: "sub", // defines type for sub items
            },
        ]
   * }
   */
  type?: "root" | "sub";

  /**
   * Defines an element.
   */
  element?: React.ReactNode;
  /**
   * Defines the href for element.
   *
   * Note: The href prop can be used to define the root href that don't need to repeat that href for children.
   * 
   * ```ts
   * {
   *    id: "user",
        element: "User",
        href: "/user", // define at the root.
        startIcon: <User />,
        children: [
            {
              id: "user-profile",
              element: "Profile",
              href: "/profile", // the href will be: "/user/profile"
              type: "sub",
            },
            {
              id: "user-cards",
              element: "Cards",
              href: "/cards", // the href will be: "/user/cards"
              type: "sub",
            },
        ]
   * }
   */
  href?: string;
  /**
   * If it's true the `href` prop which you have provided will visible in other tab.
   *
   * Note: this prop use for external links.
   * @example href: "https://www.google.com"
   */
  external?: boolean;
  /**
   * Element placed before the element.
   */
  startIcon?: React.ReactNode;
  /**
   * Element placed after the element.
   */
  endIcon?: React.ReactNode;
  /**
   * Defines the caption at the bottom of element.
   */
  caption?: string;
};

export interface NavItemDefPublicModelProperties {
  /**
   * Defines the component for item.
   * @default "div"
   */
  component?: NavItemComponentProps["component"];
  /**
   * If true, the item is active.
   * @default false
   */
  active?: boolean;
  /**
   * If true, the item is expanded if has children.
   * @default false
   */
  expanded?: boolean;
  /**
   * If true, the item is selected.
   *
   * @default false
   *
   * @description
   * This prop will only support if the item doesn't have children.
   */
  selected?: boolean;
  /**
   * If it's true, a loading overlay is displayed.
   * @default false
   */
  loading?: boolean;
  /**
   * If it's true, the item is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * The startIcon and endIcon will only disabled in destop mode from (`md` to `xl`).
   * @default false
   */
  disableIconOnDesktop?: boolean;
  /**
   * The startIcon and endIcon will only disabled in mobile mode from (`xs` to `md`).
   * @default false
   */
  disableIconOnMobile?: boolean;
  /**
   * If it's true, the caption tooltip will be disabled, (on mouse hover).
   */
  disableCaptionTooltip?: boolean;
  /**
   * If it's true, the selection is disabled.
   * @default false
   */
  disableSelection?: boolean;
  /**
   * If it's true, the expansion is disabled.
   * @default false
   */
  disableExpansion?: boolean;
}

type NavItemDefaultItemModelProperties = NavItemDefPrivateModelProperties &
  NavItemDefPublicModelProperties;

type ItemDef<R> = R & {
  children?: ItemDef<R>[];
};

/**
 * NavItemDef use for `NavigationBar` items.
 */
export type NavItemDef<OtherItemDef extends object = {}> = ItemDef<
  NavItemDefaultItemModelProperties & OtherItemDef
>;
