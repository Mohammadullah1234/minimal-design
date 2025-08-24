"use client";

import { varAlpha } from "@/UI/styles/colorManipulator";
import { useMinimalTheme } from "@/UI/styles/hooks";
import { SxProps, Theme } from "@/UI/styles/MuiStyles";

export function paperStyles(theme: Theme): SxProps<Theme> {
  const minimalTheme = useMinimalTheme();

  return {
    boxShadow: "none",
    backdropFilter: "blur(10px)",
    border: "1px solid",
    borderColor: varAlpha(minimalTheme.palette.grey["500Channel"], "12%"),
    background: varAlpha(minimalTheme.palette.common.whiteChannel, "0.9"),
    overflow: "hidden",

    ...theme.applyStyles("dark", {
      background: varAlpha(minimalTheme.palette.grey["900Channel"], "0.9"),
    }),
  };
}

export function paperBlueGradientStyles(): SxProps<Theme> {
  return {
    width: "unset",
    height: "unset",
    position: "absolute",
    top: 0,
    right: 0,
    pointerEvents: "none",
    zIndex: 0,
  };
}

export function paperRedGradientStyles(): SxProps<Theme> {
  return {
    width: "unset",
    height: "unset",
    position: "absolute",
    bottom: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 0,
  };
}
