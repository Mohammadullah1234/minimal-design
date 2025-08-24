"use client";

import { useNavigationBar, useNavItem } from "@/UI/material/NavigationBar";
import { useMinimalTheme } from "@/UI/styles/hooks";
import { SxProps, Theme } from "@/UI/styles/MuiStyles";

export function navItemCaptionInfoIconStyles(): SxProps<Theme> {
  const { orientation, density } = useNavigationBar();
  const {
    item: { type },
  } = useNavItem();
  const minimalPalette = useMinimalTheme().palette;

  return {
    "& svg": { width: 16, height: 16, color: minimalPalette.grey[500] },

    ...(orientation === "vertical" &&
      density === "compact" &&
      type === "root" && {
        position: "absolute",
        top: 11,
        left: 5,
      }),
  };
}
