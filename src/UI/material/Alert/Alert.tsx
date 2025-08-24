"use client";

import * as React from "react";
import MuiAlert, {
  AlertProps as MuiAlertProps,
  AlertColor as MuiAlertColor,
  AlertPropsVariantOverrides as MuiAlertPropsVariantOverrides,
  AlertPropsColorOverrides as MuiAlertPropsColorOverrides,
  AlertRootSlotPropsOverrides as MuiAlertRootSlotPropsOverrides,
  AlertIconSlotPropsOverrides as MuiAlertIconSlotPropsOverrides,
  AlertMessageSlotPropsOverrides as MuiAlertMessageSlotPropsOverrides,
  AlertActionSlotPropsOverrides as MuiAlertActionSlotPropsOverrides,
  AlertCloseButtonSlotPropsOverrides as MuiAlertCloseButtonSlotPropsOverrides,
  AlertCloseIconSlotPropsOverrides as MuiAlertCloseIconSlotPropsOverrides,
  AlertSlots as MuiAlertSlots,
  AlertSlotsAndSlotProps as MuiAlertSlotsAndSlotProps,
  AlertOwnerState as MuiAlertOwnerState,
} from "@mui/material/Alert";
import { styled } from "@/UI/styles/MuiStyles";
import combineSxProps, {
  CombineSxPropsParams,
} from "@/UI/utils/combineSxProps";
import { pxToRem } from "@/UI/utils/font";
import alertClasses from "./alertClasses";
import { Error, Info, Success, Warning } from "@/UI/icons/minimal";
import {
  alertColorAndVariantStyles,
  alertStyles,
} from "../styles/customizations/Alert";
import { memoTheme } from "../utils";

const AlertTitle = styled("h2")(
  memoTheme(() => ({
    fontSize: pxToRem(17),
    fontWeight: 600,
    lineHeight: 1.6,
    letterSpacing: "0.0075em",
  }))
);
const AlertDescription = styled("span")(
  memoTheme(() => ({
    margin: 0,
    fontWeight: 400,
    fontSize: "1rem",
    lineHeight: 1.5,
    letterSpacing: "0.00938em",
  }))
);

const Alert = ({
  children,
  severity = "info",
  color,
  variant = "standard",
  description,
  title,
  ...props
}: AlertProps) => {
  const icons = {
    info: <Info />,
    success: <Success />,
    warning: <Warning />,
    error: <Error />,
  };

  const renderStyles: CombineSxPropsParams[] = React.useMemo(
    () => [
      alertStyles,
      (theme) => alertColorAndVariantStyles(theme, color, severity, variant),
    ],
    [color, severity, variant]
  );

  return (
    <MuiAlert
      {...props}
      icon={icons[severity]}
      color={color ?? severity}
      slotProps={{ action: {} }}
      sx={combineSxProps(
        renderStyles,
        title && description
          ? {
              [`& .${alertClasses.message}`]: {
                padding: "0.25rem 0",
              },
            }
          : {},
        props?.sx
      )}
    >
      {children ?? (
        <>
          {title && (
            <AlertTitle className={alertClasses.title}>{title}</AlertTitle>
          )}
          {description && (
            <AlertDescription className={alertClasses.description}>
              {description}
            </AlertDescription>
          )}
        </>
      )}
    </MuiAlert>
  );
};

export type AlertColor = MuiAlertColor;
export interface AlertPropsVariantOverrides
  extends MuiAlertPropsVariantOverrides {}

export interface AlertPropsColorOverrides extends MuiAlertPropsColorOverrides {}

export interface AlertRootSlotPropsOverrides
  extends MuiAlertRootSlotPropsOverrides {}
export interface AlertIconSlotPropsOverrides
  extends MuiAlertIconSlotPropsOverrides {}
export interface AlertMessageSlotPropsOverrides
  extends MuiAlertMessageSlotPropsOverrides {}
export interface AlertActionSlotPropsOverrides
  extends MuiAlertActionSlotPropsOverrides {}
export interface AlertCloseButtonSlotPropsOverrides
  extends MuiAlertCloseButtonSlotPropsOverrides {}
export interface AlertCloseIconSlotPropsOverrides
  extends MuiAlertCloseIconSlotPropsOverrides {}
export interface AlertSlots extends MuiAlertSlots {}
export type AlertSlotsAndSlotProps = MuiAlertSlotsAndSlotProps;
export interface AlertProps extends MuiAlertProps {
  /**
   * Defines the Description under the title.
   *
   * Note: This prop will only support, if children not availabe.
   */
  description?: string;
}
export interface AlertOwnerState extends MuiAlertOwnerState {}

export default Alert;
