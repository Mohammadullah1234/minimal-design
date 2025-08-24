import {
  ListSubheaderClasses as MuiListSubheaderClasses,
  getListSubheaderUtilityClass as MuigetListSubheaderUtilityClass,
  listSubheaderClasses as MuilistSubheaderClasses,
} from "@mui/material/ListSubheader";

export interface ListSubheaderClasses extends MuiListSubheaderClasses {}
export type ListSubheaderClassKey = keyof ListSubheaderClasses;

export function getListItemUtilityClass(slot: string) {
  return MuigetListSubheaderUtilityClass(slot);
}

const listSubheaderClasses: ListSubheaderClasses = MuilistSubheaderClasses;
export default listSubheaderClasses;
