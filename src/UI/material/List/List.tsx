"use client";

import * as React from "react";
import MuiList, { ListOwnProps as MuiListOwnProps } from "@mui/material/List";
import {
  OverridableComponent,
  OverridableTypeMap,
  OverrideProps,
} from "../utils";
import { listStyles } from "../styles/customizations/List";
import combineSxProps from "@/UI/utils/combineSxProps";

const List: ExtendList<ListTypeMap> = React.forwardRef((inProps, ref) => {
  const renderStyles = React.useMemo(() => [listStyles], []);

  return (
    <MuiList
      {...inProps}
      ref={ref}
      sx={combineSxProps(renderStyles, inProps?.sx)}
    />
  );
}) as ExtendList<ListTypeMap>;

export interface ListOwnProps extends MuiListOwnProps {}

export interface ListTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "ul",
> {
  props: AdditionalProps & ListOwnProps;
  defaultComponent: RootComponent;
}

/**
 * utility to create component types that inherit props from List.
 */
export interface ExtendListTypeMap<TypeMap extends OverridableTypeMap> {
  props: TypeMap["props"] & ListTypeMap["props"];
  defaultComponent: TypeMap["defaultComponent"];
}
export type ExtendList<TypeMap extends OverridableTypeMap> =
  OverridableComponent<ExtendListTypeMap<TypeMap>>;

export type ListProps<
  RootComponent extends React.ElementType = ListTypeMap["defaultComponent"],
  AdditionalProps = {},
> = OverrideProps<
  ListTypeMap<AdditionalProps, RootComponent>,
  RootComponent
> & {
  component?: React.ElementType;
};

export default List;
