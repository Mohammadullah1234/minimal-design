import {
  ToolbarClasses as MuiToolbarClasses,
  getToolbarUtilityClass as MuigetToolbarUtilityClass,
  toolbarClasses as MuitoolbarClasses,
} from "@mui/material/Toolbar";

export interface ToolbarClasses extends MuiToolbarClasses {}
export type ToolbarClassKey = keyof ToolbarClasses;

export function getToolbarUtilityClass(slot: string) {
  return MuigetToolbarUtilityClass(slot);
}

const toolbarClasses: ToolbarClasses = MuitoolbarClasses;
export default toolbarClasses;
