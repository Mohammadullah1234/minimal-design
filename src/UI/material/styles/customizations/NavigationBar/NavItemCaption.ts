"use client";

import { useMinimalTheme } from "@/UI/styles/hooks";
import { SxProps, Theme } from "@/UI/styles/MuiStyles";
import { pxToRem } from "@/UI/utils/font";

export function navItemCaptionStyles(theme: Theme): SxProps<Theme> {
  const minimalPalette = useMinimalTheme().palette;

  return {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    display: "block",
    fontWeight: "600",
    color: minimalPalette.grey[500],
    fontSize: pxToRem(12),
    textTransform: "unset",

    ...theme.applyStyles("dark", {
      color: minimalPalette.grey[600],
    }),
  };
}
