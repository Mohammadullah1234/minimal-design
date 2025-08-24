import {
  ListItemIconClasses as MuiListItemIconClasses,
  getListItemIconUtilityClass as MuigetListItemIconUtilityClass,
  listItemIconClasses as MuilistItemIconClasses,
} from "@mui/material/ListItemIcon";

export interface ListItemIconClasses extends MuiListItemIconClasses {}
export type ListItemIconClassKey = keyof ListItemIconClasses;

export function getListItemUtilityClass(slot: string) {
  return MuigetListItemIconUtilityClass(slot);
}

const listItemIconClasses: ListItemIconClasses = MuilistItemIconClasses;
export default listItemIconClasses;
