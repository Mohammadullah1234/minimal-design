import generateUtilityClass from "@/UI/utils/generateUtilityClass";
import {
  StackClasses as MuiStackClasses,
  stackClasses as MuistackClasses,
} from "@mui/material/Stack";

export interface StackClasses extends MuiStackClasses {}
export type StackClassKey = keyof StackClasses;

export function generateStackUtilityClass(slot: string) {
  return generateUtilityClass("MuiStack", slot);
}
const stackClasses: StackClasses = MuistackClasses;

export default stackClasses;
