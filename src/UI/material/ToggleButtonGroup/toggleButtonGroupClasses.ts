import {
  ToggleButtonGroupClasses as MuiToggleButtonGroupClasses,
  toggleButtonGroupClasses as MuitoggleButtonGroupClasses,
  getToggleButtonGroupUtilityClass as MuigetToggleButtonGroupUtilityClass,
} from "@mui/material/ToggleButtonGroup";

export interface ToggleButtonGroupClasses extends MuiToggleButtonGroupClasses {}
export type ToggleButtonGroupClassKey = keyof ToggleButtonGroupClasses;

export function getToggleButtonGroupUtilityClass(slot: string): string {
  return MuigetToggleButtonGroupUtilityClass(slot);
}
const toggleButtonGroupClasses: ToggleButtonGroupClasses =
  MuitoggleButtonGroupClasses;

export default toggleButtonGroupClasses;
