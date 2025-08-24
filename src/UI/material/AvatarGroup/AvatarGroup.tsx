"use client";

import * as React from "react";
import MuiAvatarGroup, {
  AvatarGroupPropsVariantOverrides as MuiAvatarGroupPropsVariantOverrides,
  AvatarGroupComponentsPropsOverrides as MuiAvatarGroupComponentsPropsOverrides,
  AvatarGroupSlots as MuiAvatarGroupSlots,
  AvatarGroupSlotsAndSlotProps as MuiAvatarGroupSlotsAndSlotProps,
  AvatarGroupOwnProps as MuiAvatarGroupOwnProps,
  AvatarGroupProps as MuiAvatarGroupProps,
  AvatarGroupOwnerState as MuiAvatarGroupOwnerState,
} from "@mui/material/AvatarGroup";
import { OverridableComponent } from "@/UI/material/utils";

const AvatarGroup: OverridableComponent<AvatarGroupTypeMap> = React.forwardRef(
  (inProps, ref) => <MuiAvatarGroup {...inProps} ref={ref} />
) as OverridableComponent<AvatarGroupTypeMap>;

export interface AvatarGroupPropsVariantOverrides
  extends MuiAvatarGroupPropsVariantOverrides {}
export interface AvatarGroupComponentsPropsOverrides
  extends MuiAvatarGroupComponentsPropsOverrides {}

export interface AvatarGroupSlots extends MuiAvatarGroupSlots {}
export type AvatarGroupSlotsAndSlotProps = MuiAvatarGroupSlotsAndSlotProps;
export interface AvatarGroupOwnProps extends MuiAvatarGroupOwnProps {}

export interface AvatarGroupTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "div",
> {
  props: AdditionalProps & AvatarGroupOwnProps;
  defaultComponent: RootComponent;
}

export type AvatarGroupProps<
  RootComponent extends
    React.ElementType = AvatarGroupTypeMap["defaultComponent"],
  AdditionalProps = {},
> = MuiAvatarGroupProps<RootComponent, AdditionalProps>;
export interface AvatarGroupOwnerState extends MuiAvatarGroupOwnerState {}

export default AvatarGroup;
