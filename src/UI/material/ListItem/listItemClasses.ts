import {
  ListItemClasses as MuiListItemClasses,
  getListItemUtilityClass as MuigetListItemUtilityClass,
  listItemClasses as MuilistItemClasses,
} from "@mui/material/ListItem";

export interface ListItemClasses extends MuiListItemClasses {}
export type ListItemClassKey = keyof ListItemClasses;

export function getListItemUtilityClass(slot: string) {
  return MuigetListItemUtilityClass(slot);
}

const listItemClasses: ListItemClasses = MuilistItemClasses;
export default listItemClasses;
