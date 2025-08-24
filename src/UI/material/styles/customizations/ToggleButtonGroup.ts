"use client";

import { SxProps, Theme } from "@/UI/styles/MuiStyles";
import { useMinimalTheme } from "@/UI/styles/hooks";
import {
  toggleButtonGroupClasses,
  ToggleButtonGroupProps,
} from "@/UI/material/ToggleButtonGroup";
import { toggleButtonPadding, toggleButtonSize } from "./ToggleButton";
import { componentVariantMouseHoverEffects } from "../componentVariantStyles";

export function toggleButtonGroupStyles(
  theme: Theme,
  color: ToggleButtonGroupProps["color"],
  size: "small" | "medium" | "large"
): SxProps<Theme> {
  const minimalPalette = useMinimalTheme().palette;

  const gap = 4;
  const buttonPadding = toggleButtonPadding[size] - gap;
  const buttonSize = toggleButtonSize[size] - (gap * 2 + 2);

  return {
    padding: "4px",
    gap: "4px",
    border: "1px solid",
    borderColor: `${minimalPalette.shared.paperOutlined}`,
    borderRadius: `${minimalPalette.baseAction.borderRadius}px`,

    [`& .${toggleButtonGroupClasses.grouped}`]: {
      border: "none",
      borderRadius: "inherit",
      padding: `${buttonPadding}px`,
      minWidth: buttonSize,
      minHeight: buttonSize,
      ...componentVariantMouseHoverEffects(theme, color),

      [`&.${toggleButtonGroupClasses.disabled}`]: {
        border: "none",
      },
      [`&.${toggleButtonGroupClasses.selected}`]: {
        boxShadow: "none",
        "&:hover": {
          backgroundColor:
            "color-mix(in srgb, currentColor calc(0.2 * 100%), transparent)",
        },
      },
    },
  };
}
