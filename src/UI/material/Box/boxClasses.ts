import generateUtilityClass from "@/UI/utils/generateUtilityClass";
import {
  BoxClasses as MuiBoxClasses,
  boxClasses as MuiboxClasses,
} from "@mui/material/Box";

export interface BoxClasses extends MuiBoxClasses {}
export type BoxClassKey = keyof BoxClasses;

export function generateBoxUtilityClass(slot: string): string {
  return generateUtilityClass("MuiBox", slot);
}

const boxClasses: BoxClasses = MuiboxClasses;

export default boxClasses;
