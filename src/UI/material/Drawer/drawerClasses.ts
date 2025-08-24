import {
  DrawerClasses as MuiDrawerClasses,
  getDrawerUtilityClass as MuigetDrawerUtilityClass,
  drawerClasses as MuidrawerClasses,
} from "@mui/material/Drawer";

export interface DrawerClasses extends MuiDrawerClasses {}
export type DrawerClassKey = keyof DrawerClasses;

export function getDrawerUtilityClass(slot: string) {
  return MuigetDrawerUtilityClass(slot);
}

const drawerClasses: DrawerClasses = MuidrawerClasses;
export default drawerClasses;
