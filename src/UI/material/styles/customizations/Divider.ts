"use client";

import { useMinimalTheme } from "@/UI/styles/hooks";
import { SxProps, Theme } from "@/UI/styles/MuiStyles";

export function dividerStyles(): SxProps<Theme> {
  // const minimalPalette = useMinimalTheme().palette;

  return {
    // background: minimalPalette.divider,
  };
}
