import {
  DialogTitleClasses as MuiDialogTitleClasses,
  getDialogTitleUtilityClass as MuigetDialogTitleUtilityClass,
  dialogTitleClasses as MuidialogTitleClasses,
} from "@mui/material/DialogTitle";

export interface DialogTitleClasses extends MuiDialogTitleClasses {}
export type DialogTitleClassKey = keyof DialogTitleClasses;

export function getDialogTitleUtilityClass(slot: string) {
  return MuigetDialogTitleUtilityClass(slot);
}
const dialogTitleClasses: DialogTitleClasses = MuidialogTitleClasses;

export default dialogTitleClasses;
