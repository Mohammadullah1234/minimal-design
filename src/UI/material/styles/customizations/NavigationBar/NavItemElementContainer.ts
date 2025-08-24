"use client";

import { NavItemElementContainerProps } from "@/UI/material/NavigationBar";
import { SxProps, Theme } from "@/UI/styles/MuiStyles";

export function navItemElementContainerStyles(
  variant: NavItemElementContainerProps["variant"]
): SxProps<Theme> {
  return {
    minWidth: 0,
    ...(variant === "item"
      ? {
          width: "100%",
        }
      : {
          width: "auto",
          overflow: "hidden",
          transition: "color 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        }),
  };
}
