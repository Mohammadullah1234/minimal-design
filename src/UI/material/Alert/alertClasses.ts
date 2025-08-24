import generateUtilityClasses from "@/UI/utils/generateUtilityClasses";
import {
  alertClasses as MuialertClasses,
  AlertClasses as MuiAlertClasses,
  getAlertUtilityClass as MuiGetAlertUtilityClass,
} from "@mui/material/Alert";

export interface AlertClasses extends MuiAlertClasses {
  /** Styles applied to alert title element. */
  title: string;
  /** Styles applied to alert description element. */
  description: string;
}
export type AlertClassKey = keyof AlertClasses;

export function getAlertUtilityClass(slot: string): string {
  return MuiGetAlertUtilityClass(slot);
}

const alertClasses: AlertClasses = {
  ...MuialertClasses,
  ...generateUtilityClasses(
    "MuiAlert",
    ["title", "description"],
    (key, value) => `${key}-${value}`
  ),
};

export default alertClasses;
