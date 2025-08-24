"use client";

import { CSSProperties, SxProps, Theme } from "@/UI/styles/MuiStyles";
import { useMinimalTheme, MinimalTheme } from "@/UI/styles/hooks";
import { varAlpha } from "@/UI/styles/colorManipulator";
import resolveSelector from "@/UI/utils/resolveSelector";

// for selected --------------------------------------------
const selectedStyles = (
  theme: Theme,
  palette: MinimalTheme["palette"]
): SxProps<Theme> => ({
  color: palette.grey[800],
  backgroundColor: varAlpha(palette.grey["500Channel"], 0.08),

  ...theme.applyStyles("dark", {
    color: palette.grey[100],
  }),
});

export function navItemActiveStyles(
  active: SxProps<Theme>,
  theme: Theme,
  custome: SxProps<Theme> = (theme) => {
    const minimalPalette = useMinimalTheme().palette;

    return {
      ...(selectedStyles(theme, minimalPalette) as CSSProperties),
      "&:hover": {
        backgroundColor: varAlpha(minimalPalette.grey["500Channel"], 0.15),
      },
    };
  }
): SxProps<Theme> {
  const themeActive = resolveSelector(active, theme);
  const customeActive = resolveSelector(custome, theme);

  return {
    ...(active ? themeActive : customeActive),
  };
}

export function navItemSelectedStyles(
  selected: SxProps<Theme>,
  theme: Theme
): SxProps<Theme> {
  const minimalPalette = useMinimalTheme().palette;
  const themeSelected = resolveSelector(selected, theme);

  return {
    "&:hover": {
      backgroundColor: varAlpha(minimalPalette.grey["500Channel"], 0.15),
    },
    ...(selected ? themeSelected : selectedStyles(theme, minimalPalette)),
  };
}

type RenderStatusStylesProps = {
  active: boolean;
  activeStyles: SxProps<Theme>;
  expanded: boolean;
  expandedStyles: SxProps<Theme>;
  selected: boolean;
  selectedStyles: SxProps<Theme>;
};
export function renderStatusStyles({
  active,
  activeStyles,
  expanded,
  expandedStyles,
  selected,
  selectedStyles,
}: RenderStatusStylesProps): SxProps<Theme> {
  if (active) return activeStyles;
  if (expanded) return expandedStyles;
  if (selected) return selectedStyles;

  return {};
}
