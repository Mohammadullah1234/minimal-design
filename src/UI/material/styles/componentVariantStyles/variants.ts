"use client";

import { varAlpha } from "@/UI/styles/colorManipulator";
import { SxProps, Theme } from "@/UI/styles/MuiStyles";
import { MinimalPalette, PaletteColorKey } from "@/UI/theme/minimal/palette";
import { ComponentVariantStyleMethodOptions } from "./componentVariantStyles";

export const variantText = <Color>(
  theme: Theme,
  color: Color,
  palette: MinimalPalette
): SxProps => {
  if (color === "default")
    return {
      color: palette.grey[600],
      ...theme.applyStyles("dark", {
        color: palette.grey[400],
      }),
    };

  if (color === "standard")
    return {
      color: palette.grey[900],
      ...theme.applyStyles("dark", {
        color: palette.grey[50],
      }),
    };

  return {
    color: palette[color as PaletteColorKey].main,
  };
};

export const variantFilled = <Color>(
  theme: Theme,
  color: Color,
  palette: MinimalPalette
): SxProps => {
  if (color === "default")
    return {
      color: palette.grey[800],
      backgroundColor: palette.grey[300],

      ...theme.applyStyles("dark", {
        backgroundColor: palette.grey[200],
      }),
    };

  if (color === "standard")
    return {
      color: palette.common.white,
      backgroundColor: palette.grey[900],

      ...theme.applyStyles("dark", {
        color: palette.grey[900],
        backgroundColor: palette.common.white,
      }),
    };

  return {
    color: palette[color as PaletteColorKey].contrastText,
    backgroundColor: palette[color as PaletteColorKey].main,
  };
};

export const variantOutlined = <Color>(
  theme: Theme,
  color: Color,
  palette: MinimalPalette,
  disableBorder: boolean = false
): SxProps => {
  const borderColor =
    color === "default"
      ? {
          borderColor: varAlpha(palette.grey["500Channel"], "25%"),
        }
      : color === "standard"
        ? {
            borderColor: varAlpha(palette.grey["500Channel"], "35%"),
          }
        : {
            borderColor: `color-mix(in srgb, currentColor calc(${palette.baseAction.disabledOpacity} * 100%), transparent)`,
          };

  return {
    ...(!disableBorder && {
      border: "1px solid",
    }),
    ...borderColor,
    ...variantText(theme, color, palette),
  };
};

export const variantSoft = <Color>(
  theme: Theme,
  color: Color,
  palette: MinimalPalette
): SxProps => {
  if (color === "default")
    return {
      color: palette.grey[600],
      backgroundColor: varAlpha(palette.grey["500Channel"], 0.15),

      ...theme.applyStyles("dark", {
        color: palette.grey[500],
        backgroundColor: varAlpha(palette.grey["300Channel"], 0.15),
      }),
    };

  if (color === "standard")
    return {
      color: palette.grey[900],
      backgroundColor: varAlpha(
        palette.grey["500Channel"],
        "calc(0.16 * 100%)"
      ),

      ...theme.applyStyles("dark", {
        color: palette.common.white,
      }),
    };

  return {
    color: palette[color as PaletteColorKey].dark,
    backgroundColor: varAlpha(
      palette[color as PaletteColorKey].mainChannel,
      "calc(0.16 * 100%)"
    ),

    ...theme.applyStyles("dark", {
      color: palette[color as PaletteColorKey].light,
    }),
  };
};

export const variantWaterSoft = <Color>(
  theme: Theme,
  color: Color,
  palette: MinimalPalette
): SxProps => {
  if (color === "default")
    return {
      color: palette.grey[600],
      backgroundColor: varAlpha(
        palette.grey["600Channel"],
        palette.baseAction.hoverOpacity
      ),

      ...theme.applyStyles("dark", {
        color: palette.grey[400],
      }),
    };

  if (color === "standard")
    return {
      color: palette.grey[800],
      backgroundColor: varAlpha(
        palette.grey["500Channel"],
        palette.baseAction.hoverOpacity
      ),

      ...theme.applyStyles("dark", {
        color: palette.grey[50],
      }),
    };

  return {
    color: palette[color as PaletteColorKey].main,
    backgroundColor: varAlpha(
      palette[color as PaletteColorKey].mainChannel,
      palette.baseAction.hoverOpacity
    ),

    ...theme.applyStyles("dark", {
      color: palette[color as PaletteColorKey].light,
    }),
  };
};

export const variantInverted = <Color>(
  theme: Theme,
  color: Color,
  palette: MinimalPalette
): SxProps => {
  if (color === "default")
    return {
      color: palette.grey[800],
      backgroundColor: varAlpha(palette.grey["400Channel"], 0.3),

      ...theme.applyStyles("dark", {
        backgroundColor: palette.grey[300],
      }),
    };

  if (color === "standard")
    return {
      color: palette.grey[900],
      backgroundColor: palette.grey[300],

      ...theme.applyStyles("dark", {
        color: palette.grey[200],
        backgroundColor: palette.grey[800],
      }),
    };

  return {
    color: palette[color as PaletteColorKey].darker,
    backgroundColor: palette[color as PaletteColorKey].lighter,

    ...theme.applyStyles("dark", {
      color: palette[color as PaletteColorKey].lighter,
      backgroundColor: palette[color as PaletteColorKey].darker,
    }),
  };
};

/**
 * variantBackgroundColor
 */
export const variantBackgroundColor = <Color>(
  theme: Theme,
  color: Color,
  backgroundColor: ComponentVariantStyleMethodOptions["backgroundColor"] = "none",
  palette: MinimalPalette
): SxProps<Theme> => {
  switch (backgroundColor) {
    case "light":
      return {
        backgroundColor:
          color === "default"
            ? varAlpha(
                palette.grey["500Channel"],
                palette.baseAction.hoverOpacity
              )
            : color === "standard"
              ? varAlpha(
                  palette.grey["600Channel"],
                  palette.baseAction.hoverOpacity
                )
              : varAlpha(
                  palette[color as PaletteColorKey].mainChannel,
                  palette.baseAction.hoverOpacity
                ),

        ...theme.applyStyles("dark", {
          backgroundColor:
            color === "default"
              ? varAlpha(
                  palette.grey["400Channel"],
                  palette.baseAction.hoverOpacity
                )
              : color === "standard"
                ? varAlpha(
                    palette.grey["300Channel"],
                    palette.baseAction.hoverOpacity
                  )
                : "auto",
        }),
      };

    case "normal":
      return {
        backgroundColor:
          color === "default"
            ? palette.grey[300]
            : color === "standard"
              ? varAlpha(
                  palette.grey["500Channel"],
                  palette.baseAction.disabledOpacity
                )
              : varAlpha(palette[color as PaletteColorKey].mainChannel, 0.3),

        ...theme.applyStyles("dark", {
          backgroundColor:
            color === "default"
              ? palette.grey[700]
              : color === "standard"
                ? palette.grey[700]
                : "auto",
        }),
      };

    case "main":
      return variantFilled(theme, color, palette);

    case "dark":
      return {
        backgroundColor:
          color === "default"
            ? palette.grey[400]
            : color === "standard"
              ? palette.grey[700]
              : palette[color as PaletteColorKey].dark,
        color:
          color === "default"
            ? "auto"
            : color === "standard"
              ? palette.grey[50]
              : palette[color as PaletteColorKey].contrastText,

        ...theme.applyStyles("dark", {
          backgroundColor:
            color === "default"
              ? "auto"
              : color === "standard"
                ? palette.grey[400]
                : "auto",
          color:
            color === "default"
              ? "auto"
              : color === "standard"
                ? palette.grey[900]
                : "auto",
        }),
      };

    case "inverted":
      return {
        backgroundColor:
          color === "default"
            ? palette.grey[400]
            : color === "standard"
              ? palette.grey[400]
              : varAlpha(palette[color as PaletteColorKey].mainChannel, 0.4),

        ...theme.applyStyles("dark", {
          backgroundColor:
            color === "default"
              ? palette.grey[500]
              : color === "standard"
                ? palette.grey[700]
                : varAlpha(
                    palette[color as PaletteColorKey].mainChannel,
                    palette.baseAction.disabledOpacity + 0.2
                  ),
        }),
      };

    default:
      return {};
  }
};
