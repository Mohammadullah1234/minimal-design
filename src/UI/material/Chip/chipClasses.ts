import {
  ChipClasses as MuiChipClasses,
  chipClasses as MuichipClasses,
  getChipUtilityClass as MuigetChipUtilityClass,
} from "@mui/material/Chip";

export interface ChipClasses extends MuiChipClasses {}
export type ChipClassKey = keyof ChipClasses;

export function getChipUtilityClass(slot: string): string {
  return MuigetChipUtilityClass(slot);
}
const chipClasses: ChipClasses = MuichipClasses;

export default chipClasses;
