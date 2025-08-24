"use client";

import * as React from "react";
import MuiToolbar, {
  ToolbarPropsVariantOverrides as MuiToolbarPropsVariantOverrides,
  ToolbarOwnProps as MuiToolbarOwnProps,
} from "@mui/material/Toolbar";
import { OverridableComponent, OverrideProps } from "../utils";

const Toolbar: OverridableComponent<ToolbarTypeMap> = React.forwardRef(
  (props, ref) => {
    return <MuiToolbar {...props} ref={ref} />;
  }
) as OverridableComponent<ToolbarTypeMap>;

export interface ToolbarPropsVariantOverrides
  extends MuiToolbarPropsVariantOverrides {}
export interface ToolbarOwnProps extends MuiToolbarOwnProps {}

export interface ToolbarTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "div",
> {
  props: AdditionalProps & ToolbarOwnProps;
  defaultComponent: RootComponent;
}

export type ToolbarProps<
  RootComponent extends React.ElementType = ToolbarTypeMap["defaultComponent"],
  AdditionalProps = {},
> = OverrideProps<
  ToolbarTypeMap<AdditionalProps, RootComponent>,
  RootComponent
> & {
  component?: React.ElementType;
};

export default Toolbar;
