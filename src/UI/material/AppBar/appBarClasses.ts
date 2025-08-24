import {
  AppBarClasses as MuiAppBarClasses,
  getAppBarUtilityClass as MuigetAppBarUtilityClass,
  appBarClasses as MuiappBarClasses,
} from "@mui/material/AppBar";

export interface AppBarClasses extends MuiAppBarClasses {}
export type AppBarClassKey = keyof AppBarClasses;

export function getAppBarUtilityClass(slot: string) {
  return MuigetAppBarUtilityClass(slot);
}

const appBarClasses: AppBarClasses = MuiappBarClasses;

export default appBarClasses;
