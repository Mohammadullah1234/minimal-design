import {
  BreadcrumbsClasses as MuiBreadcrumbsClasses,
  getBreadcrumbsUtilityClass as MuigetBreadcrumbsUtilityClass,
  breadcrumbsClasses as MuibreadcrumbsClasses,
} from "@mui/material/Breadcrumbs";

export interface BreadcrumbsClasses extends MuiBreadcrumbsClasses {}
export type BreadcrumbsClassKey = keyof BreadcrumbsClasses;

export function getBreadcrumbsUtilityClass(slot: string): string {
  return MuigetBreadcrumbsUtilityClass(slot);
}

const breadcrumbsClasses: BreadcrumbsClasses = MuibreadcrumbsClasses;

export default breadcrumbsClasses;
