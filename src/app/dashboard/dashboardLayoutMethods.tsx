"use client";

import { SwipeableDrawerProps } from "@mui/material/SwipeableDrawer";
import { createContext } from "react";

type DrawerStateActionType = "navbarUser" | "navbarNotification";

type MainDrawerStateProps = {
  open: boolean;
  children: React.ReactNode;
} & Omit<SwipeableDrawerProps, "open" | "onOpen" | "onClose">;

export const defaultDrawerProps = {
  open: false,
  children: null,
};

type DrawerReducerActionType = { type: DrawerStateActionType | null };
export const drawerReducer: (
  state: MainDrawerStateProps,
  action: DrawerReducerActionType
) => MainDrawerStateProps = (state, action = { type: null }) => {
  switch (action.type) {
    case "navbarUser":
      return {
        open: true,
        // children: <UserDrawer />,
        children: null,
        // sx: dashboardUserDrawerStyles,
      };

    default:
      return {
        ...state,
        open: false,
      };
  }
};

// context ---------------------------------
type DashboardLayoutContextProps = {
  dispatchMainDrawer: React.ActionDispatch<[action: DrawerReducerActionType]>;
};
export const DashboardLayoutContext =
  createContext<DashboardLayoutContextProps>({
    dispatchMainDrawer: () => ({ type: null }),
  });
