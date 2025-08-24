"use client";

import { pxToRem } from "@/UI/utils/font";
import { alertClasses, AlertProps } from "@/UI/material/Alert";
import { SxProps, Theme } from "@/UI/styles/MuiStyles";
import { useMinimalTheme } from "@/UI/styles/hooks";
import { varAlpha } from "@/UI/styles/colorManipulator";
import { useOverrideProps } from "../../OverridePropsProvider";

export function alertStyles(): SxProps<Theme> {
  const minimalTheme = useMinimalTheme();
  const overrideProps = useOverrideProps();

  return {
    borderRadius: `${minimalTheme.palette.baseAction.borderRadius}px`,
    fontSize: pxToRem(14.5),
    padding: "8px 16px",
    boxShadow: "none",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
    fontWeight: 700,
    fontFamily: overrideProps?.fontFamily ?? minimalTheme.fonts.publicSans,
  };
}

export function alertColorAndVariantStyles(
  theme: Theme,
  color: AlertProps["color"],
  severity: AlertProps["severity"] = "info",
  variant: AlertProps["variant"] = "standard"
): SxProps<Theme> {
  const minimalPalette = useMinimalTheme().palette;
  const renderColor = color ?? severity;

  const lightModeStyles = {
    standard: {
      color: minimalPalette[renderColor].darker,
      background: minimalPalette[renderColor].lighter,
      svgColor: minimalPalette[renderColor].main,
    },
    filled: {
      color: minimalPalette[renderColor].contrastText,
      background: minimalPalette[renderColor].main,
      svgColor: minimalPalette[renderColor].contrastText,
    },
    outlined: {
      color: minimalPalette[renderColor].dark,
      background: varAlpha(
        minimalPalette[renderColor].mainChannel,
        minimalPalette.baseAction.hoverOpacity
      ),
      svgColor: minimalPalette[renderColor].main,
    },
  };

  const darkModeStyles = {
    standard: {
      color: minimalPalette[renderColor].lighter,
      background: minimalPalette[renderColor].darker,
      svgColor: minimalPalette[renderColor].light,
    },
    filled: {
      color: minimalPalette[renderColor].contrastText,
      background: minimalPalette[renderColor].dark,
      svgColor: minimalPalette[renderColor].contrastText,
    },
    outlined: {
      color: minimalPalette[renderColor].light,
      background: varAlpha(
        minimalPalette[renderColor].mainChannel,
        minimalPalette.baseAction.hoverOpacity
      ),
      svgColor: minimalPalette[renderColor].light,
    },
  };

  return {
    background: lightModeStyles[variant]?.background,
    color: lightModeStyles[variant]?.color,
    ...(variant === "outlined"
      ? {
          border: `1px solid ${varAlpha(
            minimalPalette[renderColor].mainChannel,
            minimalPalette.baseAction.hoverOpacity
          )}`,
        }
      : {}),
    [`& .${alertClasses.icon}`]: {
      color: lightModeStyles[variant]?.svgColor,
    },

    ...theme.applyStyles("dark", {
      background: darkModeStyles[variant]?.background,
      color: darkModeStyles[variant]?.color,
      ...(variant === "outlined"
        ? {
            border: `1px solid ${varAlpha(
              minimalPalette[renderColor].mainChannel,
              minimalPalette.baseAction.hoverOpacity
            )}`,
          }
        : {}),

      [`& .${alertClasses.icon}`]: {
        color: darkModeStyles[variant]?.svgColor,
      },
    }),
  };
}
