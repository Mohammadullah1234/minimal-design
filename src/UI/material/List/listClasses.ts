import {
  ListClasses as MuiListClasses,
  getListUtilityClass as MuigetListUtilityClass,
  listClasses as MuilistClasses,
} from "@mui/material/List";

export interface ListClasses extends MuiListClasses {}
export type ListClassKey = keyof ListClasses;

export function getListUtilityClass(slot: string) {
  return MuigetListUtilityClass(slot);
}

const listClasses: ListClasses = MuilistClasses;

export default listClasses;
