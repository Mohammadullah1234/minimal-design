"use client";

import { SxProps, Theme } from "@/UI/styles/MuiStyles";
import { AppBarOwnProps } from "../../AppBar";
import componentVariantStyles from "../componentVariantStyles";

export function appBarStyles(): SxProps<Theme> {
  return {};
}

export function appBarColorStyles(
  theme: Theme,
  color: AppBarOwnProps["color"]
): SxProps<Theme> {
  return {
    ...componentVariantStyles(color, { disableMouseHover: true }).inverted(
      theme
    ),
    boxShadow: "none",
  };
}
