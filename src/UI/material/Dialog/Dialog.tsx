"use client";

import * as React from "react";
import MuiDialog, {
  DialogSlots as MuiDialogSlots,
  DialogTransitionSlotPropsOverrides as MuiDialogTransitionSlotPropsOverrides,
  DialogPaperSlotPropsOverrides as MuiDialogPaperSlotPropsOverrides,
  DialogContainerSlotPropsOverrides as MuiDialogContainerSlotPropsOverrides,
  DialogBackdropSlotPropsOverrides as MuiDialogBackdropSlotPropsOverrides,
  DialogRootSlotPropsOverrides as MuiDialogRootSlotPropsOverrides,
  DialogSlotsAndSlotProps as MuiDialogSlotsAndSlotProps,
  DialogProps as MuiDialogProps,
  DialogOwnerState as MuiDialogOwnerState,
} from "@mui/material/Dialog";
import resolveSelector from "@/UI/utils/resolveSelector";
import combineSxProps, {
  CombineSxPropsParams,
} from "@/UI/utils/combineSxProps";
import { dialogPaperStyles } from "../styles";

const Dialog = (props: DialogProps) => {
  const renderPaperStyles: CombineSxPropsParams[] = React.useMemo(
    () => [(theme) => dialogPaperStyles(theme, props?.fullScreen)],
    [props?.fullScreen]
  );

  const paperSlotProps = React.useCallback(
    (ownerState: DialogOwnerState) =>
      resolveSelector(props?.slotProps?.paper, ownerState),
    [props?.slotProps?.paper]
  );

  const slotProps: DialogSlotsAndSlotProps["slotProps"] = React.useMemo(
    () => ({
      ...props?.slotProps,
      paper: (ownerState) => ({
        ...paperSlotProps(ownerState),
        sx: combineSxProps(renderPaperStyles, paperSlotProps(ownerState)?.sx),
      }),
    }),
    [props?.slotProps, renderPaperStyles]
  );

  return <MuiDialog {...props} slotProps={slotProps} />;
};

export interface DialogSlots extends MuiDialogSlots {}

export interface DialogTransitionSlotPropsOverrides
  extends MuiDialogTransitionSlotPropsOverrides {}
export interface DialogPaperSlotPropsOverrides
  extends MuiDialogPaperSlotPropsOverrides {}
export interface DialogContainerSlotPropsOverrides
  extends MuiDialogContainerSlotPropsOverrides {}
export interface DialogBackdropSlotPropsOverrides
  extends MuiDialogBackdropSlotPropsOverrides {}
export interface DialogRootSlotPropsOverrides
  extends MuiDialogRootSlotPropsOverrides {}

export type DialogSlotsAndSlotProps = MuiDialogSlotsAndSlotProps;
export interface DialogProps extends MuiDialogProps {}
export interface DialogOwnerState extends MuiDialogOwnerState {}

export default Dialog;
