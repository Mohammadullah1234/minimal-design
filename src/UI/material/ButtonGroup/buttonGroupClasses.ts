import {
  buttonGroupClasses as MuibuttonGroupClasses,
  ButtonGroupClasses as MuiButtonGroupClasses,
  getButtonGroupUtilityClass as MuigetButtonGroupUtilityClass,
} from "@mui/material/ButtonGroup";

export interface ButtonGroupClasses extends MuiButtonGroupClasses {}
export type ButtonGroupClassKey = keyof ButtonGroupClasses;

export function getButtonGroupUtilityClass(slot: string): string {
  return MuigetButtonGroupUtilityClass(slot);
}
const buttonGroupClasses: ButtonGroupClasses = MuibuttonGroupClasses;

export default buttonGroupClasses