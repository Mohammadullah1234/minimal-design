"use client";

import * as React from "react";
import MuiListItemIcon, {
  ListItemIconProps as MuiListItemIconProps,
} from "@mui/material/ListItemIcon";
import { listItemIconStyles } from "../styles/customizations/ListItemIcon";
import { styled } from "@/UI/styles/MuiStyles";
import { memoTheme } from "../utils";

const ListItemIconRoot = styled(MuiListItemIcon)(
  memoTheme(() => listItemIconStyles() as TemplateStringsArray)
);

const ListItemIcon = (props: ListItemIconProps) => {
  return <ListItemIconRoot {...props} />;
};

export interface ListItemIconProps extends MuiListItemIconProps {}

export default ListItemIcon;
