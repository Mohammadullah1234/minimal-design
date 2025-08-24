import {
  PaperClasses as MuiPaperClasses,
  getPaperUtilityClass as MuigetPaperUtilityClass,
  paperClasses as MuipaperClasses,
} from "@mui/material/Paper";

export interface PaperClasses extends MuiPaperClasses {}
export type PaperClassKey = keyof PaperClasses;

export function getPaperUtilityClass(slot: string) {
  return MuigetPaperUtilityClass(slot);
}

const paperClasses: PaperClasses = MuipaperClasses;

export default paperClasses;
