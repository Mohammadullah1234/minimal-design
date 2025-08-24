"use client";

import * as React from "react";
import MuiDialogContent, {
  DialogContentProps as MuiDialogContentProps,
} from "@mui/material/DialogContent";
import { dialogContentStyles } from "../styles/customizations/DialogContent";
import combineSxProps from "@/UI/utils/combineSxProps";

const DialogContent = (props: DialogContentProps) => {
  const renderStyles = React.useMemo(() => [dialogContentStyles], []);

  return (
    <MuiDialogContent {...props} sx={combineSxProps(renderStyles, props?.sx)} />
  );
};

export interface DialogContentProps extends MuiDialogContentProps {}

export default DialogContent;
