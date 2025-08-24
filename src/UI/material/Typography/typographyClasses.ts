import {
  TypographyClasses as MuiTypographyClasses,
  getTypographyUtilityClass as MuigetTypographyUtilityClass,
  typographyClasses as MuitypographyClasses,
} from "@mui/material/Typography";

export interface TypographyClasses extends MuiTypographyClasses {}
export type TypographyClassKey = keyof TypographyClasses;

export function getTypographyUtilityClass(slot: string) {
  return MuigetTypographyUtilityClass(slot);
}

const typographyClasses: TypographyClasses = MuitypographyClasses;

export default typographyClasses;
