"use client";

import { SxProps, Theme } from "@/UI/styles/MuiStyles";

export function navItemRootStyles(_: Theme): SxProps<Theme> {
  return {
    position: "relative",
    listStyle: "none",
    margin: 0,
    padding: 0,
    outline: 0,
  };
}
