"use client";

import * as React from "react";
import MuiDialogTitle, {
  DialogTitleOwnProps as MuiDialogTitleOwnProps,
  DialogTitleTypeMap as MuiDialogTitleTypeMap,
  DialogTitleProps as MuiDialogTitleProps,
} from "@mui/material/DialogTitle";
import { OverridableComponent } from "../utils";
import { TypographyTypeMap } from "../Typography";
import combineSxProps from "@/UI/utils/combineSxProps";
import { dialogTitleStyles } from "../styles/customizations/DialogTitle";

const DialogTitle: OverridableComponent<DialogTitleTypeMap> = React.forwardRef(
  (inProps, ref) => {
    const renderStyles = React.useMemo(() => [dialogTitleStyles], []);

    return (
      <MuiDialogTitle
        {...inProps}
        sx={combineSxProps(renderStyles, inProps?.sx)}
        ref={ref}
      />
    );
  }
) as OverridableComponent<DialogTitleTypeMap>;

export interface DialogTitleOwnProps extends MuiDialogTitleOwnProps {}
export interface DialogTitleTypeMap<
  AdditionalProps = {},
  RootComponent extends
    React.ElementType = TypographyTypeMap["defaultComponent"],
> extends MuiDialogTitleTypeMap<AdditionalProps, RootComponent> {}

export type DialogTitleProps<
  RootComponent extends
    React.ElementType = DialogTitleTypeMap["defaultComponent"],
  AdditionalProps = {
    component?: React.ElementType;
  },
> = MuiDialogTitleProps<RootComponent, AdditionalProps>;

export default DialogTitle;
