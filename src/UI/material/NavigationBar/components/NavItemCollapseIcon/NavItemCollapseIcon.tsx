"use client";

import * as React from "react";
import { KeyboardArrowDown, KeyboardArrowRight } from "@/UI/icons/minimal";
import { SvgIconProps } from "@/UI/material/SvgIcon";
import { styled } from "@/UI/styles/MuiStyles";
import { CreateSlotsAndSlotProps, SlotProps } from "@/UI/material/utils";
import { navItemCollapseIconStyles } from "@/UI/material/styles/customizations";
import navItemClasses from "../NavItem/navItemClasses";
import useSlotAndSlotProps from "@/UI/hooks/useSlotAndSlotProps";
import resolveSelector from "@/UI/utils/resolveSelector";
import { shouldForwardProp } from "@/UI/material/styles";

const ItemCollapseIconStyled = styled("div", {
  shouldForwardProp: (prop) => shouldForwardProp(prop),
})(() => navItemCollapseIconStyles() as TemplateStringsArray);

const NavItemCollapseIcon = React.memo(
  ({
    expanded = false,
    expandable = true,
    rootComponent,
    slots,
    slotProps: SlotProps,
    ...props
  }: NavItemCollapseIconProps) => {
    const ownerState = React.useMemo(
      () => ({
        expanded,
        expandable,
        rootComponent,
      }),
      [expanded, expandable, rootComponent]
    );

    const slotProps = React.useMemo(
      () => resolveSelector(SlotProps, ownerState),
      [SlotProps, ownerState]
    );

    const [ItemCollapseIcon, itemCollapseIconProps] = useSlotAndSlotProps(
      {
        slot: rootComponent,
        slotProps: props,
        elementType: ItemCollapseIconStyled,
        defaultProps: {
          className: navItemClasses.collapseIcon,
        },
      },
      [props]
    );

    const [CollapseIcon, collapseIconProps] = useSlotAndSlotProps(
      {
        slot: slots?.collapseIcon,
        slotProps: slotProps?.collapseIcon,
        elementType: KeyboardArrowDown,
        defaultProps: {
          sx: { fontSize: "1rem" },
        },
      },
      [slotProps?.collapseIcon]
    );

    const [ExpandIcon, expandIconProps] = useSlotAndSlotProps(
      {
        slot: slots?.expandIcon,
        slotProps: slotProps?.expandIcon,
        elementType: KeyboardArrowRight,
        defaultProps: {
          sx: { fontSize: "1rem" },
        },
      },
      [slotProps?.expandIcon]
    );

    const renderIcon = expandable ? (
      expanded ? (
        <CollapseIcon {...collapseIconProps} />
      ) : (
        <ExpandIcon {...expandIconProps} />
      )
    ) : null;

    return (
      <ItemCollapseIcon {...itemCollapseIconProps}>
        {renderIcon}
      </ItemCollapseIcon>
    );
  }
);

// props ---------------------------------------------------------------
export interface NavItemCollapseIconSlots {
  /**
   * The icon used to collapse the item.
   */
  collapseIcon?: React.ElementType;
  /**
   * The icon used to expand the item.
   */
  expandIcon?: React.ElementType;
}

export interface NavItemCollapseIconSlotProps {
  collapseIcon: SvgIconProps;
  expandIcon: SvgIconProps;
}

export type NavItemCollapseIconSlotsAndSlotProps = CreateSlotsAndSlotProps<
  NavItemCollapseIconSlots,
  NavItemCollapseIconSlotProps,
  NavItemCollapseIconOwnerState
>;

export interface NavItemCollapseIconOwnerState {
  /**
   * The component that renders the root slot.
   * @default "div"
   */
  rootComponent?: React.ElementType;
  /**
   * If it's true, the icon is expanded.
   * @default false
   */
  expanded?: boolean;
  /**
   * If it's false, the expandable is disabled.
   * @default true
   */
  expandable?: boolean;
}

export interface NavItemCollapseIconOwnProps
  extends NavItemCollapseIconOwnerState,
    NavItemCollapseIconSlotsAndSlotProps {}

export type NavItemCollapseIconProps<TOverirdes = {}> =
  NavItemCollapseIconOwnProps & SlotProps<"div", TOverirdes>;

export default NavItemCollapseIcon;
