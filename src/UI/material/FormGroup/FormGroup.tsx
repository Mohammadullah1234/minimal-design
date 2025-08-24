import * as React from "react";
import MuiFormGroup, {
  FormGroupProps as MuiFormGroupProps,
} from "@mui/material/FormGroup";

const FormGroup = (props: FormGroupProps) => <MuiFormGroup {...props} />;

export interface FormGroupProps extends MuiFormGroupProps {}

export default FormGroup;
