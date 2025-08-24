"use client";
import * as React from "react";
import MuiSwipeableDrawer, {
  SwipeableDrawerSwipeAreaSlotPropsOverrides as MuiSwipeableDrawerSwipeAreaSlotPropsOverrides,
  SwipeableDrawerSlots as MuiSwipeableDrawerSlots,
  SwipeableDrawerProps as MuiSwipeableDrawerProps,
} from "@mui/material/SwipeableDrawer";

const SwipeableDrawer: React.JSXElementConstructor<SwipeableDrawerProps> = (
  props
) => {
  return <MuiSwipeableDrawer {...props} />;
};

export interface SwipeableDrawerSwipeAreaSlotPropsOverrides
  extends MuiSwipeableDrawerSwipeAreaSlotPropsOverrides {}

export interface SwipeableDrawerSlots extends MuiSwipeableDrawerSlots {}
export interface SwipeableDrawerProps extends MuiSwipeableDrawerProps {}

export default SwipeableDrawer;
