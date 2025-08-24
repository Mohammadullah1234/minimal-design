import {
  BadgeClasses as MuiBadgeClasses,
  getBadgeUtilityClass as MuiGetBadgeUtilityClass,
  badgeClasses as MuibadgeClasses,
} from "@mui/material/Badge";

export interface BadgeClasses extends MuiBadgeClasses {}
export type BadgeClassKey = keyof BadgeClasses;

export function getBadgeUtilityClass(slot: string): string {
  return MuiGetBadgeUtilityClass(slot);
}

const badgeClasses: BadgeClasses = MuibadgeClasses;

export default badgeClasses;
