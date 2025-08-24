import {
  DialogContentTextClasses as MuiDialogContentTextClasses,
  getDialogContentTextUtilityClass as MuigetDialogContentTextUtilityClass,
  dialogContentTextClasses as MuidialogContentTextClasses,
} from "@mui/material/DialogContentText";

export interface DialogContentTextClasses extends MuiDialogContentTextClasses {}
export type DialogContentTextClassKey = keyof DialogContentTextClasses;

export function getDialogContentTextUtilityClass(slot: string) {
  return MuigetDialogContentTextUtilityClass(slot);
}

const dialogContentTextClasses: DialogContentTextClasses =
  MuidialogContentTextClasses;
export default dialogContentTextClasses;
