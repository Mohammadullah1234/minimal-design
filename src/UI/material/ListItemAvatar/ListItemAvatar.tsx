"use client";

import * as React from "react";
import MuiListItemAvatar, {
  ListItemAvatarProps as MuiListItemAvatarProps,
} from "@mui/material/ListItemAvatar";
import { listItemAvatarStyles } from "../styles/customizations/ListItemAvatar";
import { styled } from "@/UI/styles/MuiStyles";
import { memoTheme } from "../utils";

const ListItemAvatarRoot = styled(MuiListItemAvatar)(
  memoTheme(() => listItemAvatarStyles() as TemplateStringsArray)
);

const ListItemAvatar = (props: ListItemAvatarProps) => {
  return <ListItemAvatarRoot {...props} />;
};

export interface ListItemAvatarProps extends MuiListItemAvatarProps {}

export default ListItemAvatar;
