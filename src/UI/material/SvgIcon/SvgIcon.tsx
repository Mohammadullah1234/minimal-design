"use client";

import * as React from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import MuiSvgIcon, {
  SvgIconPropsSizeOverrides as MuiSvgIconPropsSizeOverrides,
  SvgIconPropsColorOverrides as MuiSvgIconPropsColorOverrides,
  SvgIconOwnProps as MuiSvgIconOwnProps,
} from "@mui/material/SvgIcon";
import componentVariantStyles, {
  ComponentColors,
} from "../styles/componentVariantStyles";
import { OverridableStringUnion, OverrideProps } from "../utils";
import combineSxProps from "@/UI/utils/combineSxProps";

const SvgIcon: OverridableComponent<SvgIconTypeMap> = React.forwardRef(
  (inProps, ref) => {
    const { color, children, ...props } = inProps;
    const renderStyles = React.useMemo(
      () =>
        color
          ? [componentVariantStyles(color, { disableMouseHover: true }).text]
          : [],
      [color]
    );

    return (
      <MuiSvgIcon
        color={color as MuiSvgIconOwnProps["color"]}
        sx={combineSxProps(renderStyles, props?.sx)}
        {...props}
        ref={ref}
      >
        {children}
      </MuiSvgIcon>
    );
  }
) as OverridableComponent<SvgIconTypeMap>;

export interface SvgIconPropsSizeOverrides
  extends MuiSvgIconPropsSizeOverrides {}
export interface SvgIconPropsColorOverrides
  extends MuiSvgIconPropsColorOverrides {}

interface NewSvgIconOwnProps {
  /**
   * The color of the component.
   * It supports both default and custom theme colors.
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'standard'
   */
  color?: OverridableStringUnion<ComponentColors, SvgIconPropsColorOverrides>;
}
export interface SvgIconOwnProps
  extends Omit<MuiSvgIconOwnProps, "color">,
    NewSvgIconOwnProps {}

export interface SvgIconTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "svg",
> {
  props: AdditionalProps & SvgIconOwnProps;
  defaultComponent: RootComponent;
}

export type SvgIconProps<
  RootComponent extends React.ElementType = SvgIconTypeMap["defaultComponent"],
  AdditionalProps = {},
> = OverrideProps<
  SvgIconTypeMap<AdditionalProps, RootComponent>,
  RootComponent
> & {
  component?: React.ElementType;
};

export default SvgIcon;
