"use client";

import * as React from "react";
import MuiButton, {
  ButtonPropsVariantOverrides as MuiButtonPropsVariantOverrides,
  ButtonPropsColorOverrides as MuiButtonPropsColorOverrides,
  ButtonPropsSizeOverrides as MuiButtonPropsSizeOverrides,
  ButtonOwnProps as MuiButtonOwnProps,
  ExtendButtonTypeMap as MuiExtendButtonTypeMap,
  ExtendButton as MuiExtendButton,
} from "@mui/material/Button";
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from "../ButtonBase";
import combineSxProps, {
  CombineSxPropsParams,
} from "@/UI/utils/combineSxProps";
import {
  OverridableStringUnion,
  OverridableTypeMap,
  OverrideProps,
} from "@/UI/material/utils";
import {
  buttonColorAndVariantStyles,
  buttonDisabledStyles,
  buttonSizesStyles,
  buttonStyles,
} from "../styles/customizations/Button";
import {
  ComponentColors,
  ComponentVariants,
  OverridableVariantStyleOptions,
} from "../styles/componentVariantStyles";
import { ButtonGroupContext } from "../ButtonGroup";
import mergeProps from "@/UI/utils/mergeProps";

const Button: ExtendButtonBase<ButtonTypeMap> = React.forwardRef(
  (inProps, ref) => {
    const contextProps = React.useContext(ButtonGroupContext);
    const props = mergeProps([
      { ...contextProps, className: "" } as ButtonProps,
      inProps,
    ]) as ButtonProps;

    const {
      children,
      size = "medium",
      color = "standard",
      variant = "filled",
      variantStyleOptions,
      ...other
    } = props;

    const renderStyles: CombineSxPropsParams[] = React.useMemo(
      () => [buttonStyles],
      []
    );

    const renderColorAndVariantStyles = React.useMemo(
      () =>
        [
          buttonSizesStyles[size],
          buttonColorAndVariantStyles(color, variantStyleOptions)[variant],
          (theme) => buttonDisabledStyles(theme, variant),
        ] as CombineSxPropsParams[],
      [size, color, variantStyleOptions, variant]
    );

    return (
      <MuiButton
        {...other}
        variant={variant as MuiButtonOwnProps["variant"]}
        color={color as MuiButtonOwnProps["color"]}
        size={size}
        ref={ref}
        sx={combineSxProps(
          renderStyles,
          renderColorAndVariantStyles,
          other?.sx
        )}
      >
        {children}
      </MuiButton>
    );
  }
) as ExtendButtonBase<ButtonTypeMap>;

export interface ButtonPropsVariantOverrides
  extends MuiButtonPropsVariantOverrides {}
export interface ButtonPropsColorOverrides
  extends MuiButtonPropsColorOverrides {}
export interface ButtonPropsSizeOverrides extends MuiButtonPropsSizeOverrides {}

interface NewButtonOwnProps extends OverridableVariantStyleOptions {
  /**
   * The variant to use.
   * @default 'filled'
   */
  variant?: OverridableStringUnion<
    ComponentVariants,
    ButtonPropsVariantOverrides
  >;
  /**
   * The color of the component.
   * It supports both default and custom theme colors.
   * @default 'standard'
   */
  color?: OverridableStringUnion<ComponentColors, ButtonPropsColorOverrides>;
}

export interface ButtonOwnProps
  extends Omit<MuiButtonOwnProps, "variant" | "color">,
    NewButtonOwnProps {}

export type ButtonTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "button",
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & ButtonOwnProps;
  defaultComponent: RootComponent;
}>;
/**
 * utility to create component types that inherit props from ButtonBase.
 * This component has an additional overload if the `href` prop is set which
 * can make extension quite tricky
 */
export interface ExtendButtonTypeMap<TypeMap extends OverridableTypeMap>
  extends MuiExtendButtonTypeMap<TypeMap> {}
export type ExtendButton<TypeMap extends OverridableTypeMap> =
  MuiExtendButton<TypeMap>;

export type ButtonProps<
  RootComponent extends React.ElementType = ButtonTypeMap["defaultComponent"],
  AdditionalProps = {},
> = OverrideProps<
  ButtonTypeMap<AdditionalProps, RootComponent>,
  RootComponent
> & {
  component?: React.ElementType;
};

export default Button;
