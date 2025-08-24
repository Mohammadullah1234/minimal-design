import {
  fabClasses as MuifabClasses,
  FabClasses as MuiFabClasses,
  getFabUtilityClass as MuigetFabUtilityClass,
} from "@mui/material/Fab";

export interface FabClasses extends MuiFabClasses {}
export type FabClassKey = keyof FabClasses;

export function getFabUtilityClass(slot: string): string {
  return MuigetFabUtilityClass(slot);
}
const fabClasses: FabClasses = MuifabClasses;

export default fabClasses;
