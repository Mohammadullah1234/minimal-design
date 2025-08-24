"use client";
import * as React from "react";
import MuiListItem, {
  ListItemComponentsPropsOverrides as MuiListItemComponentsPropsOverrides,
  ListItemBaseProps as MuiListItemBaseProps,
  ListItemOwnProps as MuiListItemOwnProps,
} from "@mui/material/ListItem";
import { memoTheme, OverridableComponent, OverrideProps } from "../utils";
import { styled } from "@/UI/styles/MuiStyles";
import { listItemStyles } from "../styles/customizations/ListItem";

const ListItemRoot = styled(MuiListItem)(
  memoTheme(() => listItemStyles() as TemplateStringsArray)
);

const ListItem: OverridableComponent<ListItemTypeMap<{}, "li">> =
  React.forwardRef((inProps, ref) => {
    return <ListItemRoot {...inProps} ref={ref} />;
  }) as OverridableComponent<ListItemTypeMap<{}, "li">>;

export interface ListItemComponentsPropsOverrides
  extends MuiListItemComponentsPropsOverrides {}

export interface ListItemBaseProps extends MuiListItemBaseProps {}
export interface ListItemOwnProps extends MuiListItemOwnProps {}

export interface ListItemTypeMap<
  AdditionalProps,
  RootComponent extends React.ElementType,
> {
  props: AdditionalProps & ListItemOwnProps;
  defaultComponent: RootComponent;
}

export type ListItemProps<
  RootComponent extends React.ElementType = "li",
  AdditionalProps = {},
> = OverrideProps<
  ListItemTypeMap<AdditionalProps, RootComponent>,
  RootComponent
> & {
  component?: React.ElementType;
};

export default ListItem;
