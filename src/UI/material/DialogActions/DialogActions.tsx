"use client";

import * as React from "react";
import MuiDialogActions, {
  DialogActionsProps as MuiDialogActionsProps,
} from "@mui/material/DialogActions";
import { dialogActionsStyles } from "../styles/customizations/DialogActions";
import combineSxProps from "@/UI/utils/combineSxProps";

const DialogActions = (props: DialogActionsProps) => {
  const renderStyles = React.useMemo(() => [dialogActionsStyles], []);

  return (
    <MuiDialogActions {...props} sx={combineSxProps(renderStyles, props?.sx)} />
  );
};

export interface DialogActionsProps extends MuiDialogActionsProps {}

export default DialogActions;
