import {
  GridClasses as MuiGridClasses,
  gridClasses as MuigridClasses,
  getGridUtilityClass as MuigetGridUtilityClass,
} from "@mui/material/Grid";

export interface GridClasses extends MuiGridClasses {}
export type GridClassKey = keyof GridClasses;

export function getGridUtilityClass(slot: string) {
  return MuigetGridUtilityClass(slot);
}
const gridClasses: GridClasses = MuigridClasses;

export default gridClasses;
