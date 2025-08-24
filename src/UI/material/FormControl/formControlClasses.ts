import {
  FormControlClasses as MuiFormControlClasses,
  getFormControlUtilityClasses as MuigetFormControlUtilityClasses,
  formControlClasses as MuiformControlClasses,
} from "@mui/material/FormControl";

export interface FormControlClasses extends MuiFormControlClasses {}
export type FormControlClassKey = keyof FormControlClasses;

export function getFormControlUtilityClasses(slot: string): string {
  return MuigetFormControlUtilityClasses(slot);
}
const formControlClasses: FormControlClasses = MuiformControlClasses;

export default formControlClasses;
