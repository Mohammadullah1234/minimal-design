import * as React from "react";
import { GridProps } from "@mui/material/Grid";
import { TypographyProps } from "@mui/material/Typography";
import { BoxProps } from "@/UI/material/Box";
import { SxProps, Theme } from "@/UI/styles";
import { SwipeableDrawerProps } from "@mui/material/SwipeableDrawer";
import {
  DropDownMenuProps,
  NavBadgeProps,
  NavButtonProps,
  NavIconButtonProps,
} from "./components";
import { CardMediaProps } from "@mui/material/CardMedia";

type NagvButtonsProps = ({
  closeMenu,
}: {
  closeMenu: NavContextProps["closeMenu"];
}) => React.ReactNode;

export type NavContextProps = {
  closeMenu: () => void;
  navButtonProps: NavbarSlotProps["navButtonProps"];
  navIconButtonProps?: NavbarSlotProps["navIconButtonProps"];
  navBadgeProps?: NavbarSlotProps["navBadgeProps"];
  dropDownMenuProps?: NavbarSlotProps["dropDownMenuProps"];
} & NavbarStyleProps;

export type NavbarStyleProps = {
  containerStyles?: SxProps<Theme>;
  buttonLinkStyles?: SxProps<Theme>;
};

export type NavbarSlotProps = {
  /**
   * Props forwarded to the `Box` component. By default, the avaible props are based on the `Box` component.
   */
  navIconComponentProps?: BoxProps;
  /**
   * Props forwarded to the `Typography` component. By default, the avaible props are based on the `Typography` component.
   */
  navTitleProps?: TypographyProps;
  /**
   * Props forwarded to the `NavBadge` component. By default, the avaible props are based on the `NavBadge` component.
   *
   * Note: props forwarded to all `NavBadge` components inside Navbar
   */
  navBadgeProps?: Omit<NavBadgeProps, "children">;
  /**
   * Props forwarded to the `NavButton` component. By default, the avaible props are based on the `NavButton` component.
   *
   * Note: props forwarded to all `NavButton` components inside Navbar
   */
  navButtonProps?: Omit<NavButtonProps, "children">;
  /**
   * Props forwarded to the `NavIconButton` component. By default, the avaible props are based on the `NavIconButton` component.
   *
   * Note: props forwarded to all `NavIconButton` components inside Navbar
   */
  navIconButtonProps?: Omit<NavIconButtonProps, "children">;
  /**
   * Props forwarded to the `DropDownMenu` component. By default, the avaible props are based on the `DropDownMenu` component.
   *
   * Note: props forwarded to all `DropDownMenu` components inside Navbar
   */
  dropDownMenuProps?: Omit<DropDownMenuProps, "children" | "open">;
  /**
   * Props forwarded to the `Box` component of the right of Navbar. By default, the avaible props are based on the `Box` component.
   */
  mainBoxProps?: BoxProps;
  /**
   * Props forwarded to the `Box` component of the right of Navbar. By default, the avaible props are based on the `Box` component.
   */
  navSwipeableDrawerProps?: SwipeableDrawerProps;
};

export interface NavbarProps extends GridProps {
  navButtons?: React.ReactNode | NagvButtonsProps;
  navTitle?: React.ReactNode;
  /**
   * this prop will apply the path to the `<img src={navIcon}/>` element.
   */
  navIcon?: CardMediaProps["image"];
  disableNavHeader?: boolean;
  /**
   * Component placed after the navTitle.
   */
  navStartElement?: React.ReactNode;
  /**
   * Component placed at the end of Navbar.
   */
  navEndElement?: React.ReactNode;
  /**
   * The props used for each slot inside.
   * @default {}
   */
  styleProps?: NavbarStyleProps;
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps?: NavbarSlotProps;
}
