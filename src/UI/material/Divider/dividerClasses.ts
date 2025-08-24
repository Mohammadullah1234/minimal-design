import {
  DividerClasses as MuiDividerClasses,
  getDividerUtilityClass as MuigetDividerUtilityClass,
  dividerClasses as MuidividerClasses,
} from "@mui/material/Divider";

export interface DividerClasses extends MuiDividerClasses {}
export type DividerClassKey = keyof DividerClasses;

export function getDividerUtilityClass(slot: string) {
  return MuigetDividerUtilityClass(slot);
}

const dividerClasses: DividerClasses = MuidividerClasses;

export default dividerClasses;
