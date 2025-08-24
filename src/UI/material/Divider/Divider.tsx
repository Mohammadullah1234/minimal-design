"use client";
import * as React from "react";
import MuiDivider, {
  DividerPropsVariantOverrides as MuiDividerPropsVariantOverrides,
  DividerOwnProps as MuiDividerOwnProps,
} from "@mui/material/Divider";
import { OverridableComponent, OverrideProps } from "../utils";
import combineSxProps from "@/UI/utils/combineSxProps";
import { dividerStyles } from "../styles/customizations/Divider";

const Divider: OverridableComponent<DividerTypeMap> = React.forwardRef(
  (props, ref) => {
    const renderStyles = React.useMemo(() => [dividerStyles], []);

    return (
      <MuiDivider
        {...props}
        ref={ref}
        sx={combineSxProps(renderStyles, props?.sx)}
      />
    );
  }
) as OverridableComponent<DividerTypeMap>;

export interface DividerPropsVariantOverrides
  extends MuiDividerPropsVariantOverrides {}
export interface DividerOwnProps extends MuiDividerOwnProps {}

export interface DividerTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "hr",
> {
  props: AdditionalProps & DividerOwnProps;
  defaultComponent: RootComponent;
}

export type DividerProps<
  RootComponent extends React.ElementType = DividerTypeMap["defaultComponent"],
  AdditionalProps = {},
> = OverrideProps<
  DividerTypeMap<AdditionalProps, RootComponent>,
  RootComponent
> & {
  component?: React.ElementType;
};

export default Divider;
