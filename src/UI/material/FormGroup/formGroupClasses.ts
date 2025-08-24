import {
  FormGroupClasses as MuiFormGroupClasses,
  formGroupClasses as MuiformGroupClasses,
  getFormGroupUtilityClass as MuigetFormGroupUtilityClass,
} from "@mui/material/FormGroup";

export interface FormGroupClasses extends MuiFormGroupClasses {}
export type FormGroupClassKey = keyof FormGroupClasses;

export function getFormGroupUtilityClass(slot: string): string {
  return MuigetFormGroupUtilityClass(slot);
}
const formGroupClasses: MuiFormGroupClasses = MuiformGroupClasses;

export default formGroupClasses;
