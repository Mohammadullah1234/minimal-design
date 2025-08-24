import { ColorChannel, varAlpha } from "@/UI/styles/colorManipulator";
import {
  createShadowColor,
  minimalImages,
  minimalPalette,
  MinimalImages,
  MinimalPalette,
  PaletteColorKey,
  PaletteCreateShadows,
  minimalFonts,
  MinimalFonts,
} from "@/UI/theme/minimal";

export function useMinimalTheme(): MinimalTheme {
  return {
    /**
     * create custome shadow
     */
    createShadow: (colorChannel) => ({
      z1: `0 1px 2px 0 ${varAlpha(colorChannel, 0.16)}`,
      z4: `0 4px 8px 0 ${varAlpha(colorChannel, 0.16)}`,
      z8: `0 8px 16px 0 ${varAlpha(colorChannel, 0.16)}`,
      z12: `0 12px 24px -4px ${varAlpha(colorChannel, 0.16)}`,
      z16: `0 16px 32px -4px ${varAlpha(colorChannel, 0.16)}`,
      z20: `0 20px 40px -4px ${varAlpha(colorChannel, 0.16)}`,
      z24: `0 24px 48px 0 ${varAlpha(colorChannel, 0.16)}`,
      dialog: `-40px 40px 80px -8px ${varAlpha(colorChannel, 0.24)}`,
      card: `0 0 2px 0 ${varAlpha(
        colorChannel,
        0.2
      )}, 0 12px 24px -4px ${varAlpha(colorChannel, 0.12)}`,
      dropdown: `0 0 2px 0 ${varAlpha(
        colorChannel,
        0.24
      )}, -20px 20px 40px -4px ${varAlpha(colorChannel, 0.24)}`,
    }),
    /**
     * shadows
     */
    shadows: {
      primaryMain: createShadowColor(minimalPalette.primaryMain.mainChannel),
      primary: createShadowColor(minimalPalette.primary.mainChannel),
      secondary: createShadowColor(minimalPalette.secondary.mainChannel),
      info: createShadowColor(minimalPalette.info.mainChannel),
      success: createShadowColor(minimalPalette.success.mainChannel),
      warning: createShadowColor(minimalPalette.warning.mainChannel),
      error: createShadowColor(minimalPalette.error.mainChannel),
    },
    /**
     * images
     */
    images: minimalImages,
    /**
     * Palette
     */
    palette: minimalPalette,
    /**
     * Fonts
     */
    fonts: minimalFonts,
    /**
     * Zindex
     */
    zIndex: {
      drawer: 1200,
    },
    /**
     * Css variables
     */
    cssVariables: {
      colorSchemeSelector: "data-color-scheme",
      cssVarPrefix: "templete",
    },
  };
}

export type MinimalTheme = {
  createShadow: (
    colorChannel: ColorChannel
  ) => Record<PaletteCreateShadows, string>;
  shadows: Record<PaletteColorKey, string>;
  images: MinimalImages;
  palette: MinimalPalette;
  fonts: MinimalFonts;
  zIndex: {
    drawer: number;
  };
  cssVariables: {
    cssVarPrefix: string;
    colorSchemeSelector: string;
  };
};
