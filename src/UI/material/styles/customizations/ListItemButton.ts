"use client";

import { useMinimalTheme } from "@/UI/styles/hooks";
import { SxProps, Theme } from "@/UI/styles/MuiStyles";
import { useOverrideProps } from "../../OverridePropsProvider";
import {
  listItemButtonClasses,
  ListItemButtonOwnProps,
} from "../../ListItemButton";
import { varAlpha } from "@/UI/styles/colorManipulator";
import { PaletteColorKey } from "@/UI/theme";
import componentVariantStyles, { testColor } from "../componentVariantStyles";

export function listItemButtonStyles(
  theme: Theme,
  size: ListItemButtonOwnProps["size"]
): SxProps<Theme> {
  const minimalTheme = useMinimalTheme();
  const overrideProps = useOverrideProps();

  return {
    fontWeight: 600,
    fontFamily: overrideProps?.fontFamily ?? minimalTheme.fonts.publicSans,
    color: minimalTheme.palette.grey[900],
    ...(size === "small" && { paddingTop: "4px", paddingBottom: "4px" }),

    ...theme.applyStyles("dark", {
      color: minimalTheme.palette.common.white,
    }),
  };
}

export function listItemButtonColorStyles(
  theme: Theme,
  color: ListItemButtonOwnProps["color"]
): SxProps<Theme> {
  if (!testColor(color)) color = "default";

  const minimalPalette = useMinimalTheme().palette;

  const darkModeColor =
    color === "default"
      ? minimalPalette.grey[400]
      : color === "standard"
        ? minimalPalette.grey[50]
        : minimalPalette[color as PaletteColorKey].light;

  const backgroundColor = (opacity: number) =>
    color === "default"
      ? varAlpha(minimalPalette.grey["600Channel"], opacity)
      : color === "standard"
        ? varAlpha(minimalPalette.grey["900Channel"], opacity)
        : varAlpha(
            minimalPalette[color as PaletteColorKey].mainChannel,
            opacity
          );

  const darkModeBackground = (opacity: number) =>
    color === "default"
      ? varAlpha(minimalPalette.grey["400Channel"], opacity)
      : varAlpha(minimalPalette.grey["50Channel"], opacity);

  return {
    [`&.${listItemButtonClasses.selected}`]: {
      ...componentVariantStyles(color).text(theme),
      backgroundColor: backgroundColor(minimalPalette.baseAction.hoverOpacity),
      "&:hover": {
        backgroundColor: backgroundColor(0.15),
      },
    },

    ...theme.applyStyles("dark", {
      [`&.${listItemButtonClasses.selected}`]: {
        color: darkModeColor,

        ...((color === "default" || color === "standard") && {
          backgroundColor: darkModeBackground(
            minimalPalette.baseAction.hoverOpacity
          ),
          "&:hover": {
            backgroundColor: darkModeBackground(0.15),
          },
        }),
      },
    }),
  };
}
