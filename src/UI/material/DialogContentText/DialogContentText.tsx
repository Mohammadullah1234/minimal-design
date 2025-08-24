"use client";

import * as React from "react";
import MuiDialogContentText, {
  DialogContentTextOwnProps as MuiDialogContentTextOwnProps,
} from "@mui/material/DialogContentText";
import { TypographyTypeMap } from "@mui/material";
import { OverridableComponent, OverrideProps } from "../utils";
import { dialogContentTextStyles } from "../styles/customizations/DialogContentText";
import combineSxProps from "@/UI/utils/combineSxProps";

const DialogContentText: OverridableComponent<DialogContentTextTypeMap> =
  React.forwardRef((inProps, ref) => {
    const renderStyles = React.useMemo(() => [dialogContentTextStyles], []);

    return (
      <MuiDialogContentText
        {...inProps}
        ref={ref}
        sx={combineSxProps(renderStyles, inProps?.sx)}
      />
    );
  }) as OverridableComponent<DialogContentTextTypeMap>;

export interface DialogContentTextOwnProps
  extends MuiDialogContentTextOwnProps {}

export interface DialogContentTextTypeMap<
  AdditionalProps = {},
  RootComponent extends
    React.ElementType = TypographyTypeMap["defaultComponent"],
> {
  props: AdditionalProps & DialogContentTextOwnProps;
  defaultComponent: RootComponent;
}

export type DialogContentTextProps<
  RootComponent extends
    React.ElementType = DialogContentTextTypeMap["defaultComponent"],
  AdditionalProps = {},
> = OverrideProps<
  DialogContentTextTypeMap<AdditionalProps, RootComponent>,
  RootComponent
> & {
  component?: React.ElementType;
};

export default DialogContentText;
