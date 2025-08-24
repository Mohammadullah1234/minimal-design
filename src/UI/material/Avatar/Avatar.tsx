"use client";

import * as React from "react";
import MuiAvatar, {
  AvatarSlots as MuiAvatarSlots,
  AvatarPropsVariantOverrides as MuiAvatarPropsVariantOverrides,
  AvatarRootSlotPropsOverrides as MuiAvatarRootSlotPropsOverrides,
  AvatarImgSlotPropsOverrides as MuiAvatarImgSlotPropsOverrides,
  AvatarFallbackSlotPropsOverrides as MuiAvatarFallbackSlotPropsOverrides,
  AvatarSlotsAndSlotProps as MuiAvatarSlotsAndSlotProps,
  AvatarOwnProps as MuiAvatarOwnProps,
  AvatarTypeMap as MuiAvatarTypeMap,
} from "@mui/material/Avatar";
import combineSxProps from "@/UI/utils/combineSxProps";
import {
  OverridableComponent,
  OverridableStringUnion,
  OverrideProps,
} from "@/UI/material/utils";
import {
  ComponentColors,
  ComponentVariants,
  OverridableVariantStyleOptions,
} from "../styles/componentVariantStyles";
import {
  avatarStyles,
  avatarColorAndVariantStyles,
} from "../styles/customizations/Avatar";
import mergeClasses from "@/UI/utils/mergeClasses";
import { getAvatarUtilityClass } from "./avatarClasses";

const Avatar: OverridableComponent<AvatarTypeMap> = React.forwardRef(
  (inProps, ref) => {
    const {
      children,
      variant = "circular",
      variantStyle = "filled",
      color = "standard",
      size = 40,
      variantStyleOptions,
      classes,
      ...props
    } = inProps;

    const renderStyles = React.useMemo(
      () => [() => avatarStyles(size, variant)],
      [size, variant]
    );

    const renderColorAndVariantStyles = React.useMemo(
      () =>
        avatarColorAndVariantStyles(color, variantStyleOptions)[variantStyle],
      [color, variantStyleOptions, variantStyle]
    );
    const renderClasses = React.useMemo(
      
      () => ({
        ...classes,
        root: mergeClasses([
          getAvatarUtilityClass(variantStyle),
          classes?.root,
        ]),
      }),
      [classes, variantStyle]
    );

    return (
      <MuiAvatar
        {...props}
        variant={variant}
        ref={ref}
        classes={renderClasses}
        sx={combineSxProps(
          renderStyles,
          renderColorAndVariantStyles,
          props?.sx
        )}
      >
        {children}
      </MuiAvatar>
    );
  }
) as OverridableComponent<AvatarTypeMap>;

export interface AvatarSlots extends MuiAvatarSlots {}
export interface AvatarPropsVariantOverrides
  extends MuiAvatarPropsVariantOverrides {}
export interface AvatarPropsVariantStyleOverrides {}
export interface AvatarPropsColorOverrides {}
export interface AvatarRootSlotPropsOverrides
  extends MuiAvatarRootSlotPropsOverrides {}
export interface AvatarImgSlotPropsOverrides
  extends MuiAvatarImgSlotPropsOverrides {}
export interface AvatarFallbackSlotPropsOverrides
  extends MuiAvatarFallbackSlotPropsOverrides {}

export type AvatarSlotsAndSlotProps = MuiAvatarSlotsAndSlotProps;

interface NewOwnAvatarProps extends OverridableVariantStyleOptions {
  /**
   * Defines the color of the Avatar.
   * @default "standard"
   */
  color?: OverridableStringUnion<ComponentColors, AvatarPropsColorOverrides>;
  /**
   * The variant style to use.
   * @default 'filled'
   */
  variantStyle?: OverridableStringUnion<
    ComponentVariants,
    AvatarPropsVariantStyleOverrides
  >;
  /**
   * Defines the img size of the Avatar.
   * @default 40
   */
  size?: number;
}
export interface AvatarOwnProps extends MuiAvatarOwnProps, NewOwnAvatarProps {}
export interface AvatarTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "div",
> extends MuiAvatarTypeMap<
    NewOwnAvatarProps & AdditionalProps,
    RootComponent
  > {}

export type AvatarProps<
  RootComponent extends React.ElementType = AvatarTypeMap["defaultComponent"],
  AdditionalProps = {},
> = OverrideProps<
  AvatarTypeMap<AdditionalProps, RootComponent>,
  RootComponent
> & {
  component?: React.ElementType;
};

export default Avatar;
