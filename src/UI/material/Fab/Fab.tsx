"use client";

import * as React from "react";
import MuiFab, {
  FabPropsVariantOverrides as MuiFabPropsVariantOverrides,
  FabPropsSizeOverrides as MuiFabPropsSizeOverrides,
  FabPropsColorOverrides as MuiFabPropsColorOverrides,
  FabOwnProps as MuiFabOwnProps,
} from "@mui/material/Fab";
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from "../ButtonBase";
import combineSxProps, {
  CombineSxPropsParams,
} from "@/UI/utils/combineSxProps";
import mergeClasses from "@/UI/utils/mergeClasses";
import {
  fabColorAndVariantStyles,
  fabSizesStyles,
  fabStyles,
} from "../styles/customizations/Fab";
import { buttonDisabledStyles } from "../styles/customizations/Button";
import {
  ComponentColors,
  ComponentVariants,
  OverridableVariantStyleOptions,
} from "../styles/componentVariantStyles";
import { OverridableStringUnion, OverrideProps } from "@/UI/material/utils";
import fabClasses from "./fabClasses";

const Fab: ExtendButtonBase<FabTypeMap> = React.forwardRef((inProps, ref) => {
  const {
    children,
    size = "medium",
    color = "standard",
    variant = "circular",
    variantStyle = "filled",
    disabled = false,
    variantStyleOptions,
    ...props
  } = inProps;

  const renderStyles: CombineSxPropsParams[] = React.useMemo(
    () => [fabStyles],
    []
  );

  const renderColorAndVariantStyles: CombineSxPropsParams[] = React.useMemo(
    () => [
      variant === "extended"
        ? {
            gap: "8px",
          }
        : {},
      fabSizesStyles(variant, size)[size],
      fabColorAndVariantStyles(color, variantStyleOptions)[variantStyle],
      (theme) => buttonDisabledStyles(theme, variantStyle, fabClasses.disabled),
    ],
    [variant, size, color, variantStyle, variantStyleOptions]
  );

  return (
    <MuiFab
      {...props}
      color={color as MuiFabOwnProps["color"]}
      variant={variant}
      size={size}
      ref={ref}
      disabled={disabled}
      className={mergeClasses([
        (disabled && fabClasses.disabled) as string,
        props?.className,
      ])}
      sx={combineSxProps(renderStyles, renderColorAndVariantStyles, props?.sx)}
    >
      {children}
    </MuiFab>
  );
}) as ExtendButtonBase<FabTypeMap>;

export interface FabPropsVariantOverrides extends MuiFabPropsVariantOverrides {}
export interface FabPropsSizeOverrides extends MuiFabPropsSizeOverrides {}
export interface FabPropsColorOverrides extends MuiFabPropsColorOverrides {}

interface NewFabOwnProps extends OverridableVariantStyleOptions {
  /**
   * The variant style to use.
   * @default 'filled'
   */
  variantStyle?: OverridableStringUnion<
    ComponentVariants,
    FabPropsVariantOverrides
  >;
  /**
   * The color of the component.
   * It supports both default and custom theme colors.
   * @default 'standard'
   */
  color?: OverridableStringUnion<ComponentColors, FabPropsColorOverrides>;
}

export interface FabOwnProps
  extends Omit<MuiFabOwnProps, "color">,
    NewFabOwnProps {}
export type FabTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "button",
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & FabOwnProps;
  defaultComponent: RootComponent;
}>;

export type FabProps<
  RootComponent extends React.ElementType = FabTypeMap["defaultComponent"],
  AdditionalProps = {},
> = OverrideProps<FabTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default Fab;
