import {
  FormControlLabelClasses as MuiFormControlLabelClasses,
  formControlLabelClasses as MuiformControlLabelClasses,
  getFormControlLabelUtilityClasses as MuigetFormControlLabelUtilityClass,
} from "@mui/material/FormControlLabel";

export interface FormControlLabelClasses extends MuiFormControlLabelClasses {}
export type FormControlLabelClassKey = keyof FormControlLabelClasses;

export function getFormControlLabelUtilityClass(slot: string): string {
  return MuigetFormControlLabelUtilityClass(slot);
}
const formControlLabelClasses: FormControlLabelClasses =
  MuiformControlLabelClasses;

export default formControlLabelClasses;
