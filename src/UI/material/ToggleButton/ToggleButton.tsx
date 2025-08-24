"use client";

import * as React from "react";
import MuiToggleButton, {
  ToggleButtonPropsSizeOverrides as MuiToggleButtonPropsSizeOverrides,
  ToggleButtonPropsColorOverrides as MuiToggleButtonPropsColorOverrides,
  ToggleButtonOwnProps as MuiToggleButtonOwnProps,
} from "@mui/material/ToggleButton";
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from "../ButtonBase";
import combineSxProps, {
  CombineSxPropsParams,
} from "@/UI/utils/combineSxProps";
import { OverridableStringUnion, OverrideProps } from "@/UI/material/utils";
import {
  toggleButtonColorSelectedStyles,
  toggleButtonDisabledStyles,
  toggleButtonStyles,
} from "../styles/customizations/ToggleButton";
import { ComponentColors } from "../styles/componentVariantStyles";
import { ToggleButtonGroupContext } from "../ToggleButtonGroup";
import mergeProps from "@/UI/utils/mergeProps";

const ToggleButton: ExtendButtonBase<ToggleButtonTypeMap> = React.forwardRef(
  (inProps, ref) => {
    const contextProps = React.useContext(ToggleButtonGroupContext);
    const props = mergeProps([
      { ...contextProps, className: "" },
      inProps,
    ]) as ToggleButtonProps;

    const { children, size = "medium", color = "standard", ...other } = props;

    const renderStyles: CombineSxPropsParams[] = React.useMemo(
      () => [
        (theme) => toggleButtonStyles(theme, size),
        (theme) => toggleButtonColorSelectedStyles(theme, color),
        toggleButtonDisabledStyles,
      ],
      [size, color]
    );

    return (
      <MuiToggleButton
        {...other}
        size={size}
        color={color as MuiToggleButtonOwnProps["color"]}
        ref={ref}
        sx={combineSxProps(renderStyles, other?.sx)}
      >
        {children}
      </MuiToggleButton>
    );
  }
) as ExtendButtonBase<ToggleButtonTypeMap>;

export default ToggleButton;

export interface ToggleButtonPropsSizeOverrides
  extends MuiToggleButtonPropsSizeOverrides {}
export interface ToggleButtonPropsColorOverrides
  extends MuiToggleButtonPropsColorOverrides {}
interface NewToggleButtonProps {
  /**
   * The color of the button when it is in an active state.
   * It supports both default and custom theme colors.
   * @default 'standard'
   */
  color?: OverridableStringUnion<
    ComponentColors,
    ToggleButtonPropsColorOverrides
  >;
}

export interface ToggleButtonOwnProps
  extends Omit<MuiToggleButtonOwnProps, "color">,
    NewToggleButtonProps {}

export type ToggleButtonTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "button",
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & ToggleButtonOwnProps;
  defaultComponent: RootComponent;
}>;

export type ToggleButtonProps<
  RootComponent extends
    React.ElementType = ToggleButtonTypeMap["defaultComponent"],
  AdditionalProps = {},
> = OverrideProps<
  ToggleButtonTypeMap<AdditionalProps, RootComponent>,
  RootComponent
> & {
  component?: React.ElementType;
};
