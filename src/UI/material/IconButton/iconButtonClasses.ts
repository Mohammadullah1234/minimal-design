import {
  iconButtonClasses as MuiiconButtonClasses,
  IconButtonClasses as MuiIconButtonClasses,
  getIconButtonUtilityClass as MuigetIconButtonUtilityClass,
} from "@mui/material/IconButton";

export interface IconButtonClasses extends MuiIconButtonClasses {}
export type IconButtonClassKey = keyof IconButtonClasses;

export function getIconButtonUtilityClass(slot: string): string {
  return MuigetIconButtonUtilityClass(slot);
}

const iconButtonClasses: IconButtonClasses = MuiiconButtonClasses;

export default iconButtonClasses;
