import {
  buttonClasses as MuibuttonClasses,
  ButtonClasses as MuiButtonClasses,
  getButtonUtilityClass as MuigetButtonUtilityClass,
} from "@mui/material/Button";

export interface ButtonClasses extends MuiButtonClasses {}
export type ButtonClassKey = keyof ButtonClasses;

export function getButtonUtilityClass(slot: string): string {
  return MuigetButtonUtilityClass(slot);
}

const buttonClasses: ButtonClasses = MuibuttonClasses;

export default buttonClasses;
