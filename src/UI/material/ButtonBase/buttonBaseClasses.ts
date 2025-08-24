import {
  buttonBaseClasses as MuibuttonBaseClasses,
  ButtonBaseClasses as MuiButtonBaseClasses,
  getButtonBaseUtilityClass as MuigetButtonBaseUtilityClass,
} from "@mui/material/ButtonBase";

export interface ButtonBaseClasses extends MuiButtonBaseClasses {}
export type ButtonBaseClassKey = keyof ButtonBaseClasses;

export function getButtonBaseUtilityClass(slot: string): string {
  return MuigetButtonBaseUtilityClass(slot);
}
const buttonBaseClasses: ButtonBaseClasses = MuibuttonBaseClasses;

export default buttonBaseClasses;
