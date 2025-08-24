import {
  dialogClasses as MuidialogClasses,
  DialogClasses as MuiDialogClasses,
  getDialogUtilityClass as MuigetDialogUtilityClass,
} from "@mui/material/Dialog";

export interface DialogClasses extends MuiDialogClasses {}
export type DialogClassKey = keyof DialogClasses;

export function getDialogUtilityClass(slot: string) {
  return MuigetDialogUtilityClass(slot);
}

const dialogClasses: DialogClasses = MuidialogClasses;
export default dialogClasses;
