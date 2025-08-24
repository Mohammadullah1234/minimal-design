import {
  DialogActionsClasses as MuiDialogActionsClasses,
  getDialogActionsUtilityClass as MuigetDialogActionsUtilityClass,
  dialogActionsClasses as MuidialogActionsClasses,
} from "@mui/material/DialogActions";

export interface DialogActionsClasses extends MuiDialogActionsClasses {}
export type DialogActionsClassKey = keyof DialogActionsClasses;

export function getDialogActionsUtilityClass(slot: string) {
  return MuigetDialogActionsUtilityClass(slot);
}

const dialogActionsClasses: DialogActionsClasses = MuidialogActionsClasses;
export default dialogActionsClasses;
