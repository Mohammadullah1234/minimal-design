"use client";

import { pxToRem } from "@/UI/utils/font";
import {
  toggleButtonClasses,
  ToggleButtonOwnProps,
} from "@/UI/material/ToggleButton";
import { SxProps, Theme } from "@/UI/styles/MuiStyles";
import componentVariantStyles from "../componentVariantStyles";
import { useMinimalTheme } from "@/UI/styles/hooks";
import { varAlpha } from "@/UI/styles/colorManipulator";
import { useOverrideProps } from "../../OverridePropsProvider";

export const toggleButtonPadding = {
  small: 7,
  medium: 11,
  large: 15,
};
export const toggleButtonSize = {
  small: 40,
  medium: 48,
  large: 56,
};
export const toggleButtonfontSize = {
  small: 13,
  medium: 14,
  large: 15,
};

export function toggleButtonStyles(
  theme: Theme,
  size: "small" | "medium" | "large"
): SxProps<Theme> {
  const minimalTheme = useMinimalTheme();
  const overrideProps = useOverrideProps();

  return {
    borderRadius: pxToRem(minimalTheme.palette.baseAction.borderRadius),
    border: "1px solid",
    borderColor: `${minimalTheme.palette.divider}`,
    textTransform: "unset",
    color: minimalTheme.palette.grey[600],
    gap: "8px",

    padding: `${toggleButtonPadding[size]}px`,
    minWidth: toggleButtonSize[size],
    minHeight: toggleButtonSize[size],
    fontSize: pxToRem(toggleButtonfontSize[size]),
    fontWeight: 700,
    fontFamily: overrideProps?.fontFamily ?? minimalTheme.fonts.publicSans,

    ...theme.applyStyles("dark", {
      color: minimalTheme.palette.grey[400],
    }),

    "& svg": {
      fontSize: "1.4rem",
    },
    "&:hover": {
      backgroundColor:
        "color-mix(in srgb, currentColor calc(0.15 * 100%), transparent)",
    },
  };
}

export function toggleButtonColorSelectedStyles(
  theme: Theme,
  color: ToggleButtonOwnProps["color"]
): SxProps<Theme> {
  return {
    [`&.${toggleButtonClasses.selected}`]: componentVariantStyles(color, {
      useOutlinedBoxShadow: true,
      backgroundColor: "light",
      disableMouseHover: true,
    }).outlined(theme, true),
  } as SxProps<Theme>;
}

export function toggleButtonDisabledStyles(theme: Theme): SxProps<Theme> {
  const minimalPalette = useMinimalTheme().palette;

  return {
    "&:disabled": {
      color: minimalPalette.grey[500],
      cursor: "default",
      pointerEvents: "none",
      borderColor: minimalPalette.grey[300],

      ...theme.applyStyles("dark", {
        borderColor: minimalPalette.grey[700],
      }),

      [`&.${toggleButtonClasses.selected}`]: {
        background: varAlpha(minimalPalette.grey["300Channel"], 0.8),
        ...theme.applyStyles("dark", {
          background: varAlpha(minimalPalette.grey["700Channel"], 0.8),
        }),
      },
    },
  };
}
