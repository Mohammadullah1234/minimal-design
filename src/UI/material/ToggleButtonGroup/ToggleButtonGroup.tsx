"use client";

import * as React from "react";
import MuiToggleButtonGroup, {
  ToggleButtonGroupPropsSizeOverrides as MuiToggleButtonGroupPropsSizeOverrides,
  ToggleButtonGroupPropsColorOverrides as MuiToggleButtonGroupPropsColorOverrides,
  ToggleButtonGroupProps as MuiToggleButtonGroupProps,
} from "@mui/material/ToggleButtonGroup";
import combineSxProps, {
  CombineSxPropsParams,
} from "@/UI/utils/combineSxProps";
import { OverridableStringUnion } from "@/UI/material/utils";
import { toggleButtonGroupStyles } from "../styles/customizations/ToggleButtonGroup";
import { ComponentColors } from "../styles/componentVariantStyles";

const ToggleButtonGroup = React.forwardRef(
  (inProps: ToggleButtonGroupProps, ref) => {
    const { children, color = "standard", size = "medium", ...props } = inProps;

    const renderStyles: CombineSxPropsParams[] = React.useMemo(
      () => [(theme) => toggleButtonGroupStyles(theme, color, size)],
      [size]
    );

    return (
      <MuiToggleButtonGroup
        {...props}
        color={color as MuiToggleButtonGroupProps["color"]}
        size={size}
        ref={ref}
        sx={combineSxProps(renderStyles, props?.sx)}
      >
        {children}
      </MuiToggleButtonGroup>
    );
  }
);

export interface ToggleButtonGroupPropsSizeOverrides
  extends MuiToggleButtonGroupPropsSizeOverrides {}
export interface ToggleButtonGroupPropsColorOverrides
  extends MuiToggleButtonGroupPropsColorOverrides {}
interface NewToggleButtonProps {
  /**
   * The color of the button when it is in an active state.
   * It supports both default and custom theme colors.
   * @default 'standard'
   */
  color?: OverridableStringUnion<
    ComponentColors,
    ToggleButtonGroupPropsColorOverrides
  >;
}

export interface ToggleButtonGroupProps
  extends Omit<MuiToggleButtonGroupProps, "color">,
    NewToggleButtonProps {}

export default ToggleButtonGroup;
