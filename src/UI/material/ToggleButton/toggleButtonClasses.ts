import {
  ToggleButtonClasses as MuiToggleButtonClasses,
  toggleButtonClasses as MuitoggleButtonClasses,
  getToggleButtonUtilityClass as MuigetToggleButtonUtilityClass,
} from "@mui/material/ToggleButton";

export interface ToggleButtonClasses extends MuiToggleButtonClasses {}
export type ToggleButtonClassKey = keyof ToggleButtonClasses;

export function getToggleButtonUtilityClass(slot: string): string {
  return MuigetToggleButtonUtilityClass(slot);
}
const toggleButtonClasses: ToggleButtonClasses = MuitoggleButtonClasses;

export default toggleButtonClasses;
