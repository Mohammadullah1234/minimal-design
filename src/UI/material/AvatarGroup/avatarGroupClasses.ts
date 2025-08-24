import {
  AvatarGroupClasses as MuiAvatarGroupClasses,
  getAvatarGroupUtilityClass as MuiGetAvatarGroupUtilityClass,
  avatarGroupClasses as MuiavatarGroupClasses,
} from "@mui/material/AvatarGroup";

export interface AvatarGroupClasses extends MuiAvatarGroupClasses {}
export type AvatarGroupClassKey = keyof AvatarGroupClasses;

export function getAvatarGroupUtilityClass(slot: string): string {
  return MuiGetAvatarGroupUtilityClass(slot);
}

const avatarGroupClasses: AvatarGroupClasses = MuiavatarGroupClasses;

export default avatarGroupClasses;
