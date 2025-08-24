"use client";

import * as React from "react";
import NavItemContext from "../contexts/NavItemContext";
import { NavLinkProps } from "../../NavLink";
import {
  NavItemCaptionOwnProps,
  NavItemCollapseIconOwnProps,
  NavItemContainerOwnProps,
  NavItemIconOwnProps,
  NavItemTransitionGroupOwnProps,
  NavItemTransitionGroupType,
} from "../components";
import {
  NavItemDef,
  NavItemDefSlotsAndSlotProps,
  NavItemDefStatus,
} from "../types";
import { UseNavigationTreeViewPropsReturnValue } from "./useNavigationTreeViewProps";
import { SxProps, Theme } from "@/UI/styles/MuiStyles";
import formatContextErrorMsg from "@/UI/utils/formatContextErrorMsg";

// for root ------------------------------------------------------
export interface UseNavItemRootPropsMethodReturn {
  ref: React.Ref<unknown>;
  id: string;
  "aria-selected"?: React.AriaAttributes["aria-selected"];
  "aria-expanded"?: React.AriaAttributes["aria-expanded"];
  "aria-disabled"?: React.AriaAttributes["aria-disabled"];
  "data-active"?: React.AriaAttributes["aria-selected"];
  "data-loading"?: React.AriaAttributes["aria-selected"];
  className: string;
  onClick: ((e: React.MouseEvent<any, MouseEvent>) => void) | undefined;
}
export type UseNavItemRootSlotProps<ExternalProps = {}> = ExternalProps &
  UseNavItemRootPropsMethodReturn;

// for item container -----------------------------------------------------------

export type UseNavItemContainerPropsMethodReturn = Pick<
  NavItemDef,
  "variant" | "type" | "loading"
> &
  NavItemContainerOwnProps & {
    disableRipple: boolean;
    target: React.AnchorHTMLAttributes<"a">["target"];
    href: NavLinkProps["href"] | undefined;
    component: React.ElementType;
    className: string;
    onClick: (e: React.MouseEvent<any, MouseEvent>) => void;
    onMouseEnter: (e: React.MouseEvent<any, MouseEvent>) => void;
    onMouseLeave: (e: React.MouseEvent<any, MouseEvent>) => void;
    sx: SxProps<Theme>;
  };

export type UseNavItemContainerSlotProps<ExternalProps = {}> = ExternalProps &
  UseNavItemContainerPropsMethodReturn;

// for collapse icon ------------------------------------------------------------

export interface UseNavItemCollapseIconPropsMethodReturn
  extends Omit<NavItemCollapseIconOwnProps, "slots" | "slotProps"> {}

export type UseNavItemCollapseIconSlotProps<ExternalProps = {}> =
  ExternalProps & UseNavItemCollapseIconPropsMethodReturn;

// for nav item icon ------------------------------------------------------------

export interface UseNavItemIconPropsMethodReturn extends NavItemIconOwnProps {
  className: string;
  children: React.ReactNode;
}

export type UseNavItemIconSlotProps<ExternalProps = {}> = ExternalProps &
  UseNavItemIconPropsMethodReturn;

// for nav item caption ------------------------------------------------------------

export interface UseNavItemCaptionPropsMethodReturn
  extends NavItemCaptionOwnProps {
  className: string;
  sx: SxProps<Theme>;
}

export type UseNavItemCaptionSlotProps<ExternalProps = {}> = ExternalProps &
  UseNavItemCaptionPropsMethodReturn;

// for nav item transition group ------------------------------------------------
export type UseNavItemTransitionGroupMethodReturn<
  Group extends NavItemTransitionGroupType,
> = Pick<
  NavItemTransitionGroupOwnProps<Group>,
  "transitionGroupType" | "slotProps" | "slots" | "baseComponent" | "variant"
> & {
  "aria-multiselectable": React.AriaAttributes["aria-multiselectable"];
  className: string;
  children: React.ReactNode;
  sx: SxProps<Theme>;
};

export type UseNavItemTransitionGroupSlotProps<
  Group extends NavItemTransitionGroupType,
  ExternalProps = {},
> = ExternalProps & UseNavItemTransitionGroupMethodReturn<Group>;

// nav item all methods ---------------------------------------------------------
export interface UseNavItemMethodsReturn {
  /**
   * Resolver for the item root slot's props.
   * @param {ExternalProps} externalProps Additional props for the item root slot.
   * @returns {UseNavItemRootSlotProps<ExternalProps>} Props that should be spread on the item root slot.
   */
  getRootProps: <ExternalProps extends Record<string, any> = {}>(
    externalProps?: ExternalProps
  ) => UseNavItemRootSlotProps<ExternalProps>;
  /**
   * Resolver for the item container slot's props.
   * @param {ExternalProps} externalProps Additional props for the item container slot.
   * @returns {UseNavItemContainerSlotProps<ExternalProps>} Props that should be spread on the item container slot.
   */
  getItemContainerProps: <ExternalProps extends Record<string, any> = {}>(
    externalProps?: ExternalProps
  ) => UseNavItemContainerSlotProps<ExternalProps>;
  /**
   * Resolver for the item icon slot's props.
   * @param {"start" | "end"} iconType Defines the iconType.
   * @param {ExternalProps} externalProps Additional props for the item icon slot.
   * @returns {UseNavItemIconSlotProps<ExternalProps>} Props that should be spread on the item icon slot.
   */
  getItemIconProps: <ExternalProps extends Record<string, any> = {}>(
    iconType: "start" | "end",
    externalProps?: ExternalProps
  ) => UseNavItemIconSlotProps<ExternalProps>;
  /**
   * Resolver for the item caption slot's props.
   * @param {ExternalProps} externalProps Additional props for the item caption slot.
   * @returns {UseNavItemCaptionSlotProps<ExternalProps>} Props that should be spread on the item caption slot.
   */
  getItemCaptionProps: <ExternalProps extends Record<string, any> = {}>(
    externalProps?: ExternalProps
  ) => UseNavItemCaptionSlotProps<ExternalProps>;
  /**
   * Resolver for the collapse icon slot's props.
   * @param {ExternalProps} externalProps Additional props for the item collapse slot.
   * @returns {UseNavItemCollapseIconSlotProps<ExternalProps>} Props that should be spread on the collapse icon slot.
   */
  getCollapseIconProps: <ExternalProps extends Record<string, any> = {}>(
    externalProps?: ExternalProps
  ) => UseNavItemCollapseIconSlotProps<ExternalProps>;
  /**
   * Resolver for the item trnasition group slot's props.
   * @param {Group} groupType Defines the transitionGroup type.
   * @param {ExternalProps} externalProps Additional props for the item trnasition group slot.
   * @returns {UseNavItemTransitionGroupSlotProps<Group, ExternalProps>} Props that should be spread on the item trnasition group slot.
   */
  getTransitionGroupProps: <
    Group extends NavItemTransitionGroupType = NavItemTransitionGroupType,
    ExternalProps extends Record<string, any> = {},
  >(
    groupType?: Group,
    externalProps?: ExternalProps
  ) => UseNavItemTransitionGroupSlotProps<Group, ExternalProps>;
}

export type UseNavItemReturnValue<OtherItemDef extends object = {}> = {
  /**
   * Access all item props of `NavigationBar` items.
   */
  item: Required<NavItemDef<OtherItemDef>> & NavItemDefSlotsAndSlotProps;
  /**
   * Access all status of item.
   */
  status: NavItemDefStatus;
} & UseNavItemMethodsReturn &
  Pick<
    UseNavigationTreeViewPropsReturnValue<OtherItemDef>,
    "publicAPI" | "instance"
  >;

/**
 * Custome hook to access props and methods of `NavItem` component.
 */
export function useNavItem<
  OtherItemDef extends object = {},
>(): UseNavItemReturnValue<OtherItemDef> {
  const context = React.use(NavItemContext);
  if (context == null) formatContextErrorMsg("useNavItem", "NavItem");

  return context as unknown as UseNavItemReturnValue<OtherItemDef>;
}
