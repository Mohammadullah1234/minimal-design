"use client";

import { createContext } from "react";
import { NavContextProps } from "./NavbarProps";

const slotPropsDefault = {
  navButtonProps: {
    startIcon: undefined,
  },
  navIconButtonProps: undefined,
  navBadgeProps: undefined,
  dropDownMenuProps: undefined,
};

export const NavContext = createContext<NavContextProps>({
  closeMenu: () => undefined,
  containerStyles: undefined,
  buttonLinkStyles: undefined,
  ...slotPropsDefault,
});

export const defaultSlotProps = {
  navIconComponentProps: undefined,
  navTitleProps: undefined,
  navSwipeableDrawerProps: undefined,
  mainBoxProps: undefined,
  ...slotPropsDefault,
};
