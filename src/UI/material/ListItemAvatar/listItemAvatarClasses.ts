import {
  ListItemAvatarClasses as MuiListItemAvatarClasses,
  getListItemAvatarUtilityClass as MuigetListItemAvatarUtilityClass,
  listItemAvatarClasses as MuilistItemAvatarClasses,
} from "@mui/material/ListItemAvatar";

export interface ListItemAvatarClasses extends MuiListItemAvatarClasses {}
export type ListItemAvatarClassKey = keyof ListItemAvatarClasses;

export function getListItemUtilityClass(slot: string) {
  return MuigetListItemAvatarUtilityClass(slot);
}

const listItemAvatarClasses: ListItemAvatarClasses = MuilistItemAvatarClasses;
export default listItemAvatarClasses;
