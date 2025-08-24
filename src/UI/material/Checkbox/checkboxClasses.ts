import {
  CheckboxClasses as MuiCheckboxClasses,
  checkboxClasses as MuicheckboxClasses,
  getCheckboxUtilityClass as MuigetCheckboxUtilityClass,
} from "@mui/material/Checkbox";

export interface CheckboxClasses extends MuiCheckboxClasses {}
export type CheckboxClassKey = keyof CheckboxClasses;

export function getCheckboxUtilityClass(slot: string): string {
  return MuigetCheckboxUtilityClass(slot);
}
const checkboxClasses: MuiCheckboxClasses = MuicheckboxClasses;

export default checkboxClasses;
