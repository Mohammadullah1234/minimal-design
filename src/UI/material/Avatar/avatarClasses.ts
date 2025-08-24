import {
  AvatarClasses as MuiAvatarClasses,
  getAvatarUtilityClass as MuiGetAvatarUtilityClass,
  avatarClasses as MuiavatarClasses,
} from "@mui/material/Avatar";

export interface AvatarClasses extends MuiAvatarClasses {}
export type AvatarClassKey = keyof AvatarClasses;

export function getAvatarUtilityClass(slot: string): string {
  return MuiGetAvatarUtilityClass(slot);
}

const avatarClasses: AvatarClasses = MuiavatarClasses;

export default avatarClasses;
