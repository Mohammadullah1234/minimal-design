"use client";

import * as React from "react";
import MuiDrawer, {
  DrawerRootSlotPropsOverrides as MuiDrawerRootSlotPropsOverrides,
  DrawerDockedSlotPropsOverrides as MuiDrawerDockedSlotPropsOverrides,
  DrawerPaperSlotPropsOverrides as MuiDrawerPaperSlotPropsOverrides,
  DrawerTransitionSlotPropsOverrides as MuiDrawerTransitionSlotPropsOverrides,
  DrawerBackdropSlotPropsOverrides as MuiDrawerBackdropSlotPropsOverrides,
  DrawerSlots as MuiDrawerSlots,
  DrawerSlotsAndSlotProps as MuiDrawerSlotsAndSlotProps,
  DrawerProps as MuiDrawerProps,
  DrawerOwnerState as MuiDrawerOwnerState,
} from "@mui/material/Drawer";

const Drawer = (props: DrawerProps) => {
  return <MuiDrawer {...props} />;
};

export interface DrawerRootSlotPropsOverrides
  extends MuiDrawerRootSlotPropsOverrides {}
export interface DrawerDockedSlotPropsOverrides
  extends MuiDrawerDockedSlotPropsOverrides {}
export interface DrawerPaperSlotPropsOverrides
  extends MuiDrawerPaperSlotPropsOverrides {}
export interface DrawerTransitionSlotPropsOverrides
  extends MuiDrawerTransitionSlotPropsOverrides {}
export interface DrawerBackdropSlotPropsOverrides
  extends MuiDrawerBackdropSlotPropsOverrides {}

export interface DrawerSlots extends MuiDrawerSlots {}
export type DrawerSlotsAndSlotProps = MuiDrawerSlotsAndSlotProps;

export interface DrawerProps extends MuiDrawerProps {}
export interface DrawerOwnerState extends MuiDrawerOwnerState {}

export default Drawer;
