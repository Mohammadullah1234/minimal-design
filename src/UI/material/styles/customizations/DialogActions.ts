"use client";

import { SxProps, Theme } from "@/UI/styles/MuiStyles";

export function dialogActionsStyles(): SxProps<Theme> {
  return {
    padding: "20px 24px",
    gap: "12px",

    "&>:not(style)~:not(style)": {
      marginLeft: "unset",
    },
  };
}
