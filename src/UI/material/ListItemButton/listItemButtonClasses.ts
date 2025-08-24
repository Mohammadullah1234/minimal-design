import {
  ListItemButtonClasses as MuiListItemButtonClasses,
  getListItemButtonUtilityClass as MuigetListItemButtonUtilityClass,
  listItemButtonClasses as MuilistItemButtonClasses,
} from "@mui/material/ListItemButton";

export interface ListItemButtonClasses extends MuiListItemButtonClasses {}
export type ListItemButtonClassKey = keyof ListItemButtonClasses;

export function getListItemUtilityClass(slot: string) {
  return MuigetListItemButtonUtilityClass(slot);
}

const listItemButtonClasses: ListItemButtonClasses = MuilistItemButtonClasses;
export default listItemButtonClasses;
