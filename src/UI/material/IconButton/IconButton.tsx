"use client";

import * as React from "react";
import MuiIconButton, {
  IconButtonPropsColorOverrides as MuiIconButtonPropsColorOverrides,
  IconButtonPropsSizeOverrides as MuiIconButtonPropsSizeOverrides,
  IconButtonOwnProps as MuiIconButtonOwnProps,
} from "@mui/material/IconButton";
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from "../ButtonBase";
import combineSxProps, {
  CombineSxPropsParams,
} from "@/UI/utils/combineSxProps";
import { OverridableStringUnion, OverrideProps } from "@/UI/material/utils";
import {
  iconButtonColorAndVariantStyles,
  iconButtonSizesStyles,
  iconButtonStyles,
} from "../styles/customizations/IconButton";
import { buttonDisabledStyles } from "../styles/customizations/Button";
import {
  ComponentColors,
  ComponentVariants,
} from "../styles/componentVariantStyles";
import mergeClasses from "@/UI/utils/mergeClasses";
import iconButtonClasses, {
  getIconButtonUtilityClass,
} from "./iconButtonClasses";

const IconButton: ExtendButtonBase<IconButtonTypeMap> = React.forwardRef(
  (inProps, ref) => {
    const {
      children,
      size = "medium",
      color = "standard",
      variant = "text",
      classes,
      ...props
    } = inProps;

    const renderStyles: CombineSxPropsParams[] = React.useMemo(
      () => [
        iconButtonStyles,
        iconButtonColorAndVariantStyles(color)[variant],
        iconButtonSizesStyles[size],
        (theme) =>
          buttonDisabledStyles(theme, variant, iconButtonClasses.disabled),
      ],
      [color, variant, size]
    );

    const renderClasses: IconButtonOwnProps["classes"] = React.useMemo(
      () => ({
        ...classes,
        root: mergeClasses([getIconButtonUtilityClass(variant), classes?.root]),
      }),
      [classes, variant]
    );

    return (
      <MuiIconButton
        {...props}
        size={size}
        color={color as MuiIconButtonOwnProps["color"]}
        sx={combineSxProps(renderStyles, props?.sx)}
        classes={renderClasses}
        ref={ref}
      >
        {children}
      </MuiIconButton>
    );
  }
) as ExtendButtonBase<IconButtonTypeMap>;

export interface IconButtonPropsColorOverrides
  extends MuiIconButtonPropsColorOverrides {}
export interface IconButtonPropsSizeOverrides
  extends MuiIconButtonPropsSizeOverrides {}

interface NewIconButtonProps {
  /**
   * The color of the component.
   * It supports both default and custom theme colors.
   * @default 'standard'
   */
  color?: OverridableStringUnion<
    ComponentColors,
    IconButtonPropsColorOverrides
  >;
  /**
   * The variant to use.
   * @default "text"
   */
  variant?: OverridableStringUnion<
    ComponentVariants,
    IconButtonPropsColorOverrides
  >;
}
export interface IconButtonOwnProps
  extends Omit<MuiIconButtonOwnProps, "color">,
    NewIconButtonProps {}

export type IconButtonTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "button",
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & IconButtonOwnProps;
  defaultComponent: RootComponent;
}>;

export type IconButtonProps<
  RootComponent extends
    React.ElementType = IconButtonTypeMap["defaultComponent"],
  AdditionalProps = {},
> = OverrideProps<
  IconButtonTypeMap<AdditionalProps, RootComponent>,
  RootComponent
> & {
  component?: React.ElementType;
};

export default IconButton;
