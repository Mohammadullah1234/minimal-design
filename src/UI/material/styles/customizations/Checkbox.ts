"use client";

import { SxProps, Theme } from "@/UI/styles/MuiStyles";
import { checkboxClasses, CheckboxProps } from "@/UI/material/Checkbox";
import { useMinimalTheme } from "@/UI/styles/hooks";
import componentVariantStyles from "../componentVariantStyles";

export function checkboxStyles(theme: Theme): SxProps<Theme> {
  return {
    padding: "8px",
  };
}

export function checkboxColorCheckedStyles(
  color: CheckboxProps["color"]
): SxProps<Theme> {
  return (theme) => ({
    [`&.${checkboxClasses.checked}, &.${checkboxClasses.indeterminate}`]:
      componentVariantStyles(color).text(theme),
  });
}

export function checkboxDisabledStyles(): SxProps<Theme> {
  const minimalPalette = useMinimalTheme().palette;

  return {
    [`&.${checkboxClasses.disabled}`]: {
      color: minimalPalette.grey[500],
      boxShadow: "none",
      cursor: "default",
      pointerEvents: "none",
    },
  };
}
