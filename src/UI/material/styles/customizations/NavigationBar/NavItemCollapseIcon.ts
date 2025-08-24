"use client";

import { useNavigationBar, useNavItem } from "@/UI/material/NavigationBar";
import { SxProps, Theme } from "@/UI/styles/MuiStyles";

export function navItemCollapseIconStyles(): SxProps<Theme> {
  const { orientation, density } = useNavigationBar();
  const { item } = useNavItem();

  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    ...(orientation === "vertical" &&
      density === "compact" &&
      item.type === "root" &&
      item.variant === "item" && {
        position: "absolute",
        top: 11,
        right: 8,
      }),
  };
}
