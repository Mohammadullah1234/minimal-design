"use client";
import * as React from "react";
import MuiAppBar, {
  AppBarPropsColorOverrides as MuiAppBarPropsColorOverrides,
  AppBarOwnProps as MuiAppBarOwnProps,
} from "@mui/material/AppBar";
import {
  OverridableComponent,
  OverridableStringUnion,
  OverrideProps,
} from "../utils";
import { ExtendPaperTypeMap } from "../Paper";
import {
  appBarColorStyles,
  appBarStyles,
} from "../styles/customizations/AppBar";
import combineSxProps, {
  CombineSxPropsParams,
} from "@/UI/utils/combineSxProps";
import { ComponentColors } from "../styles/componentVariantStyles";

const AppBar: OverridableComponent<AppBarTypeMap> = React.forwardRef(
  (inProps, ref) => {
    const { children, color = "standard", ...props } = inProps;

    const renderStyles = React.useMemo(() => [appBarStyles], []);
    const renderColorStyles: CombineSxPropsParams[] = React.useMemo(
      () => [(theme) => appBarColorStyles(theme, color)],
      [color]
    );

    return (
      <MuiAppBar
        {...props}
        color={color as MuiAppBarOwnProps["color"]}
        sx={combineSxProps(renderStyles, renderColorStyles, props?.sx)}
        ref={ref}
      >
        {children}
      </MuiAppBar>
    );
  }
) as OverridableComponent<AppBarTypeMap>;

export interface AppBarPropsColorOverrides
  extends MuiAppBarPropsColorOverrides {}

interface NewAppBarOwnProps {
  /**
   * The color of the component.
   * It supports both default and custom theme colors.
   * @default 'standard'
   */
  color?: OverridableStringUnion<
    ComponentColors | "transparent",
    AppBarPropsColorOverrides
  >;
}
export interface AppBarOwnProps
  extends Omit<MuiAppBarOwnProps, "color">,
    NewAppBarOwnProps {}

export type AppBarTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "header",
> = ExtendPaperTypeMap<
  {
    props: AdditionalProps & AppBarOwnProps;
    defaultComponent: RootComponent;
  },
  "position" | "color" | "classes"
>;

export type AppBarProps<
  RootComponent extends React.ElementType = AppBarTypeMap["defaultComponent"],
  AdditionalProps = {},
> = OverrideProps<
  AppBarTypeMap<AdditionalProps, RootComponent>,
  RootComponent
> & {
  component?: React.ElementType;
};

export default AppBar;
