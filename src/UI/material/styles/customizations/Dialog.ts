"use client";

import { useMinimalTheme } from "@/UI/styles/hooks";
import { SxProps, Theme } from "@/UI/styles/MuiStyles";
import { DialogProps } from "../../Dialog";

export function dialogPaperStyles(
  theme: Theme,
  fullScreen: DialogProps["fullScreen"]
): SxProps<Theme> {
  const minimalTheme = useMinimalTheme();

  return {
    borderRadius: fullScreen ? 0 : "18px",
    background: minimalTheme.palette.common.white,
    boxShadow: minimalTheme.createShadow(
      minimalTheme.palette.common.blackChannel
    ).dialog,

    ...theme.applyStyles("dark", {
      background: minimalTheme.palette.grey[900],
    }),
  };
}
