import {
  ListItemTextClasses as MuiListItemTextClasses,
  getListItemTextUtilityClass as MuigetListItemTextUtilityClass,
  listItemTextClasses as MuilistItemTextClasses,
} from "@mui/material/ListItemText";

export interface ListItemTextClasses extends MuiListItemTextClasses {}
export type ListItemTextClassKey = keyof ListItemTextClasses;

export function getListItemUtilityClass(slot: string) {
  return MuigetListItemTextUtilityClass(slot);
}

const listItemTextClasses: ListItemTextClasses = MuilistItemTextClasses;
export default listItemTextClasses;
