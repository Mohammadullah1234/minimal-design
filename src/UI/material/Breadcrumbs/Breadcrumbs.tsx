"use client";

import * as React from "react";
import MuiBreadcrumbs, {
  BreadcrumbsCollapsedIconSlotPropsOverrides as MuiBreadcrumbsCollapsedIconSlotPropsOverrides,
  BreadcrumbsOwnerState as MuiBreadcrumbsOwnerState,
  BreadcrumbsOwnProps as MuiBreadcrumbsOwnProps,
  BreadcrumbsProps as MuiBreadcrumbsProps,
} from "@mui/material/Breadcrumbs";
import combineSxProps, {
  CombineSxPropsParams,
} from "@/UI/utils/combineSxProps";
import { OverridableComponent } from "@/UI/material/utils";
import { breadcrumbsStyles } from "../styles/customizations/Breadcrumbs";

const Breadcrumbs: OverridableComponent<BreadcrumbsTypeMap> = React.forwardRef(
  (inProps, ref) => {
    const { children, ...props } = inProps;

    const renderStyles: CombineSxPropsParams[] = React.useMemo(
      () => [breadcrumbsStyles],
      []
    );

    return (
      <MuiBreadcrumbs
        {...props}
        ref={ref}
        sx={combineSxProps(renderStyles, props?.sx)}
      >
        {children}
      </MuiBreadcrumbs>
    );
  }
) as OverridableComponent<BreadcrumbsTypeMap>;

export interface BreadcrumbsCollapsedIconSlotPropsOverrides
  extends MuiBreadcrumbsCollapsedIconSlotPropsOverrides {}
export interface BreadcrumbsOwnerState extends MuiBreadcrumbsOwnerState {}
export interface BreadcrumbsOwnProps extends MuiBreadcrumbsOwnProps {}

export interface BreadcrumbsTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "nav",
> {
  props: AdditionalProps & BreadcrumbsOwnProps;
  defaultComponent: RootComponent;
}

export type BreadcrumbsProps<
  RootComponent extends
    React.ElementType = BreadcrumbsTypeMap["defaultComponent"],
  AdditionalProps = {},
> = MuiBreadcrumbsProps<RootComponent, AdditionalProps>;

export default Breadcrumbs;
