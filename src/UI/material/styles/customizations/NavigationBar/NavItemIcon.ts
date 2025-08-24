"use client";

import { navItemClasses, useNavigationBar } from "@/UI/material/NavigationBar";
import { SxProps, Theme } from "@/UI/styles/MuiStyles";
import resolveSelector from "@/UI/utils/resolveSelector";
import { pxToRem } from "@/UI/utils/font";

export function navItemIconStyles(theme: Theme): SxProps<Theme> {
  const { itemTheme, density, orientation } = useNavigationBar();
  const iconFontSize = itemTheme.icon.fontSize;

  const iconFontSizeStyles = {
    width: density === "compact" ? iconFontSize - 2 : iconFontSize,
    height: density === "compact" ? iconFontSize - 2 : iconFontSize,
  };

  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    ...resolveSelector(itemTheme?.icon?.root, theme),

    [`&.${navItemClasses.startIcon}`]: {
      justifyContent: "flex-start",
      marginRight:
        iconFontSize === 0 ? 0 : pxToRem(orientation === "horizontal" ? 2 : 5),
      ...resolveSelector(itemTheme?.icon?.startIcon, theme),
    },
    [`&.${navItemClasses.endIcon}`]: {
      justifyContent: "flex-end",
      ...resolveSelector(itemTheme?.icon?.endIcon, theme),
    },

    "& svg": iconFontSizeStyles,
  };
}
