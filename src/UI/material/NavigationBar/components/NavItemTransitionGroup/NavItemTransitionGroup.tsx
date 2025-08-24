"use client";

import * as React from "react";
import Collapse, { CollapseProps } from "@mui/material/Collapse";
import {
  navTransitionGroupCollapseStyles,
  navTransitionGroupULStyles,
  navItemsTransitionGroupULStyles,
  navItemsPopperPaperStyles,
} from "@/UI/material/styles/customizations";
import { styled, SxProps, Theme } from "@/UI/styles/MuiStyles";
import { useMinimalTheme } from "@/UI/styles/hooks";
import { NavItemDef } from "../../types";
import Popper, { PopperProps } from "@mui/material/Popper";
import Paper from "@/UI/material/Paper";
import Grow, { GrowProps } from "@mui/material/Grow";
import {
  CreateSlotsAndSlotProps,
  memoTheme,
  SlotProps,
} from "@/UI/material/utils";
import { navItemClasses } from "../NavItem";
import useSlotAndSlotProps from "@/UI/hooks/useSlotAndSlotProps";
import resolveSelector from "@/UI/utils/resolveSelector";
import Box from "@/UI/material/Box";

const TransitionGroupULStyled = styled("ul")(
  () => navTransitionGroupULStyles() as TemplateStringsArray
);

const PaperRoot = styled(Paper)(
  memoTheme(() => navItemsPopperPaperStyles() as TemplateStringsArray)
);

const NavItemTransitionGroup: NavItemTransitionGroupComponent = ({
  baseComponent,
  slotProps: SlotProps,
  slots,
  variant = "item",
  transitionGroupType = "collapse",
  children,
  anchorEl,
  ...props
}) => {
  const zIndex = useMinimalTheme().zIndex;
  const ownerState = React.useMemo(
    () => ({
      baseComponent,
      variant,
      transitionGroupType,
      anchorEl,
    }),
    [baseComponent, variant, transitionGroupType, anchorEl]
  );
``
  const slotProps = React.useMemo(
    () => resolveSelector(SlotProps, ownerState),
    [SlotProps, ownerState]
  );

  const renderUlStyles = React.useMemo(
    () => (variant === "header" ? {} : navItemsTransitionGroupULStyles),
    [variant]
  );
  const renderCollapseStyles: SxProps<Theme> = React.useMemo(
    () => [navTransitionGroupCollapseStyles] as SxProps<Theme>,
    []
  );

  const [TransitionGroupRootUl, transitionGroupRootUlProps] =
    useSlotAndSlotProps(
      {
        slot: baseComponent,
        slotProps: props,
        elementType: TransitionGroupULStyled,
        defaultProps: {
          sx: renderUlStyles,
        },
      },
      []
    );

  const [PopperTransitionGroup, popperTransitionGroupProps] =
    useSlotAndSlotProps(
      {
        slot: slots?.popperTransitionGroup,
        slotProps: slotProps?.popperTransitionGroup,
        elementType: Grow,
      },
      []
    );

  const transitionGroupChildren = (
    <TransitionGroupRootUl {...transitionGroupRootUlProps}>
      {children}
    </TransitionGroupRootUl>
  );

  const popperRootChildren: PopperProps["children"] = ({ TransitionProps }) => {
    return (
      <PopperTransitionGroup
        {...TransitionProps}
        {...popperTransitionGroupProps}
      >
        <PaperRoot
          className={navItemClasses.transitionGroupPaper}
          sx={{
            marginLeft: "10px",
          }}
        >
          {transitionGroupChildren}
        </PaperRoot>
      </PopperTransitionGroup>
    );
  };

  const [TransitionGroupRoot, transitionGroupRootProps] = useSlotAndSlotProps(
    {
      slot: slots?.root,
      slotProps: slotProps?.root,
      elementType: transitionGroupType === "popper" ? Popper : Collapse,
      defaultProps:
        transitionGroupType === "popper"
          ? {
              sx: {
                [`& .${navItemClasses.root__ul}`]: {
                  flexDirection: "column",
                },
                zIndex: zIndex.drawer + 1,
              },
              transition: true,
            }
          : {
              component: "div",
              sx: renderCollapseStyles,
            },
    },
    [transitionGroupType, slotProps?.root]
  ) as [React.ElementType, React.ComponentProps<"div">];

  return (
    <TransitionGroupRoot {...transitionGroupRootProps}>
      {transitionGroupType === "popper"
        ? popperRootChildren
        : transitionGroupChildren}
    </TransitionGroupRoot>
  );
};

export type NavItemTransitionGroupType = "collapse" | "popper";

export interface NavItemTransitionGroupSlots {
  /**
   * The component that renders the root slot.
   * @default Collapse
   */
  root: React.ElementType;
  /**
   * The component that renders the transition group slot inside `Popper`.
   *
   * Note: This prop will only support, if `transitionGroupType="popper"` of NavItemTransitionGroup
   * @default Grow //@mui/material/Grow.
   */
  popperTransitionGroup: React.ElementType;
}

export interface NavItemTransitionGroupSlotProps<
  Group extends NavItemTransitionGroupType,
> {
  /**
   * Props forward to the root component.
   */
  root: Group extends "collapse" ? CollapseProps : PopperProps;
  /**
   * Props forward to the transition group inside `Popper`.
   *
   * Note: This prop will only support, if `transitionGroupType="popper"`.
   */
  popperTransitionGroup: GrowProps;
}

export type NavItemTransitionGroupSlotsAndSlotProps<
  Group extends NavItemTransitionGroupType,
> = CreateSlotsAndSlotProps<
  NavItemTransitionGroupSlots,
  NavItemTransitionGroupSlotProps<Group>,
  NavItemTransitionGroupOwnerState
>;

export interface NavItemTransitionGroupOwnerState {
  anchorEl?: PopperProps["anchorEl"];
  variant?: NavItemDef["variant"];
  /**
   * Defines the type transitionGroup.
   * @default "collapse"
   */
  transitionGroupType?: NavItemTransitionGroupType;
  /**
   * The component that renders the base `ul` component inside.
   * @default "ul"
   */
  baseComponent?: React.ElementType;
}

export interface NavItemTransitionGroupOwnProps<
  Group extends NavItemTransitionGroupType,
> extends NavItemTransitionGroupOwnerState,
    NavItemTransitionGroupSlotsAndSlotProps<Group> {}

export type NavItemTransitionGroupProps<
  Group extends NavItemTransitionGroupType = NavItemTransitionGroupType,
  TOverirdes = {},
> = NavItemTransitionGroupOwnProps<Group> & SlotProps<"ul", TOverirdes>;

interface NavItemTransitionGroupComponent {
  <
    Group extends NavItemTransitionGroupType = NavItemTransitionGroupType,
    TOverirdes = {},
  >(
    props: NavItemTransitionGroupProps<Group, TOverirdes>
  ): React.JSX.Element;
  propTypes?: any;
}

export default NavItemTransitionGroup;
