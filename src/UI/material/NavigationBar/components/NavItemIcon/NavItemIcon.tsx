"use client";

import * as React from "react";
import { SlotProps } from "@/UI/material/utils";
import { styled } from "@/UI/styles/MuiStyles";
import { useMuiTheme } from "@/UI/styles/hooks";
import useMediaQuery from "@/UI/hooks/useMediaQuery";
import { navItemIconStyles } from "@/UI/material/styles/customizations";
import { navItemClasses } from "../NavItem";
import { NavItemDef } from "../../types";
import useSlotAndSlotProps from "@/UI/hooks/useSlotAndSlotProps";
import { shouldForwardProp } from "@/UI/material/styles";

const ItemIconStyled = styled("div", {
  shouldForwardProp: (prop) => shouldForwardProp(prop),
})(({ theme }) => navItemIconStyles(theme) as TemplateStringsArray);

const NavItemIcon = ({
  children,
  rootComponent: RootComponent,
  disableIconOnDesktop = false,
  disableIconOnMobile = false,
  ...props
}: NavItemIconProps) => {
  const muiTheme = useMuiTheme();
  const desktopMode = useMediaQuery(muiTheme.breakpoints.up("md"));
  const mobileMode = useMediaQuery(muiTheme.breakpoints.down("md"));

  const [ItemIcon, itemIconProps] = useSlotAndSlotProps({
    slot: RootComponent,
    slotProps: props,
    elementType: ItemIconStyled,
    defaultProps: {
      className: navItemClasses.icon,
    },
  });

  return (disableIconOnDesktop && desktopMode) ||
    (disableIconOnMobile && mobileMode) ? null : children ? (
    <ItemIcon {...itemIconProps}>{children}</ItemIcon>
  ) : null;
};

export interface NavItemIconOwnProps
  extends Pick<NavItemDef, "disableIconOnDesktop" | "disableIconOnMobile"> {
  /**
   * The component that renders the root slot.
   * @default "div"
   */
  rootComponent?: React.ElementType;
}

export type NavItemIconProps<TOverrides = {}> = NavItemIconOwnProps &
  SlotProps<"div", TOverrides>;

export default NavItemIcon;
