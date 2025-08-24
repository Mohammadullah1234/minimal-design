"use client";

import * as React from "react";
import MuiListSubheader, {
  ListSubheaderOwnProps as MuiListSubheaderOwnProps,
} from "@mui/material/ListSubheader";
import { OverridableComponent, OverrideProps } from "../utils";

const ListSubheader: OverridableComponent<ListSubheaderTypeMap> =
  React.forwardRef((inProps, ref) => {
    return <MuiListSubheader {...inProps} ref={ref} />;
  }) as OverridableComponent<ListSubheaderTypeMap>;

export interface ListSubheaderOwnProps extends MuiListSubheaderOwnProps {}

export interface ListSubheaderTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "li",
> {
  props: AdditionalProps & ListSubheaderOwnProps;
  defaultComponent: RootComponent;
}

export type ListSubheaderProps<
  RootComponent extends
    React.ElementType = ListSubheaderTypeMap["defaultComponent"],
  AdditionalProps = {},
> = OverrideProps<
  ListSubheaderTypeMap<AdditionalProps, RootComponent>,
  RootComponent
> & {
  component?: React.ElementType;
};

export default ListSubheader;
