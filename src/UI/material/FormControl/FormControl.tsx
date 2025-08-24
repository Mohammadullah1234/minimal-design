"use client";

import * as React from "react";
import MuiFormControl, {
  FormControlPropsSizeOverrides as MuiFormControlPropsSizeOverrides,
  FormControlPropsColorOverrides as MuiFormControlPropsColorOverrides,
  FormControlOwnProps as MuiFormControlOwnProps,
} from "@mui/material/FormControl";
import { OverridableComponent, OverrideProps } from "../utils";

const FormControl: OverridableComponent<FormControlTypeMap> = React.forwardRef(
  (props, ref) => {
    return <MuiFormControl {...props} ref={ref} />;
  }
) as OverridableComponent<FormControlTypeMap>;

export interface FormControlPropsSizeOverrides
  extends MuiFormControlPropsSizeOverrides {}
export interface FormControlPropsColorOverrides
  extends MuiFormControlPropsColorOverrides {}
export interface FormControlOwnProps extends MuiFormControlOwnProps {}

export interface FormControlTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "div",
> {
  props: AdditionalProps & FormControlOwnProps;
  defaultComponent: RootComponent;
}

export type FormControlProps<
  RootComponent extends
    React.ElementType = FormControlTypeMap["defaultComponent"],
  AdditionalProps = {},
> = OverrideProps<
  FormControlTypeMap<AdditionalProps, RootComponent>,
  RootComponent
> & {
  component?: React.ElementType;
};

export default FormControl;
