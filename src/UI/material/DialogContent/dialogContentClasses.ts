import {
  DialogContentClasses as MuiDialogContentClasses,
  getDialogContentUtilityClass as MuigetDialogContentUtilityClass,
  dialogContentClasses as MuidialogContentClasses,
} from "@mui/material/DialogContent";

export interface DialogContentClasses extends MuiDialogContentClasses {}
export type DialogContentClassKey = keyof DialogContentClasses;

export function getDialogContentUtilityClass(slot: string) {
  return MuigetDialogContentUtilityClass(slot);
}

const dialogContentClasses: DialogContentClasses = MuidialogContentClasses;
export default dialogContentClasses;
