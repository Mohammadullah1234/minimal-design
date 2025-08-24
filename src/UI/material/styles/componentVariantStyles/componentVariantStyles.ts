"use client";
"use strick";

import { CSSProperties, SxProps, Theme } from "@/UI/styles/MuiStyles";
import { MinimalTheme, useMinimalTheme } from "@/UI/styles/hooks";
import { createShadowColor, PaletteColorKey } from "@/UI/theme";
import {
  variantFilled,
  variantOutlined,
  variantText,
  variantSoft,
  variantWaterSoft,
  variantInverted,
  variantBackgroundColor,
} from "./variants";
import deepmerge from "@/UI/utils/deepmerge";

/**
 * Caches styles per color/variant → huge performance boost in large apps
 */
export const memoizeVariantStyles = <T extends (...args: any[]) => any>(
  fn: T
) => {
  const cache = new Map<string, ReturnType<T>>();

  return (...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) cache.set(key, fn(...args));
    return cache.get(key)!;
  };
};

/**
 * variantBoxShadows
 */
function variantBoxShadows<Color>(
  color: Color,
  useBoxShadow: ComponentVariantStyleMethodOptions["useBoxShadow"] = false,
  minimalTheme: MinimalTheme
): CSSProperties {
  if (!useBoxShadow) return {};
  if (color === "default")
    return {
      boxShadow: createShadowColor(minimalTheme.palette.grey["400Channel"]),
    };

  if (color === "standard")
    return {
      boxShadow: createShadowColor(minimalTheme.palette.grey["800Channel"]),
    };

  return {
    boxShadow: minimalTheme.shadows[color as PaletteColorKey],
  };
}

/**
 * variantDarkBorder
 */
function variantDarkBorder(
  useOutlinedBoxShadow: ComponentVariantStyleMethodOptions["useOutlinedBoxShadow"] = false
): CSSProperties {
  return useOutlinedBoxShadow
    ? {
        boxShadow: `currentColor 0px 0px 0px 0.75px`,
      }
    : {};
}

/**
 * Use to define the component variant (mouse hover) color and styles.
 *
 * @param theme - Mui Theme - required
 * @param color - The color of the component, it supports only `"default" | "standard" | PaletteColorKey` colors.
 * @param options - The options use to manipulate the variant style.
 * @returns Customized variant (mouse hover) styles ready to use.
 */
export function componentVariantMouseHoverEffects<Color>(
  theme: Theme,
  color: Color,
  options: Omit<
    ComponentVariantStyleMethodOptions,
    "background" | "useOutlinedBoxShadow" | "useBoxShadow"
  > = {}
): CSSProperties {
  const minimalTheme = useMinimalTheme();
  const minimalPalette = minimalTheme.palette;
  const backgroundColorOnHover = options?.backgroundColorOnHover ?? "light";
  if (options?.disableMouseHover) return {};

  return {
    "&:hover": {
      ...variantBackgroundColor(
        theme,
        color,
        backgroundColorOnHover,
        minimalPalette
      ),
      ...variantDarkBorder(options?.useOutlinedBoxShadowOnHover),
      ...variantBoxShadows(color, options?.useBoxShadowOnHover, minimalTheme),
    },
  };
}

/**
 * Use to test the color that contains only `"default" | "standard" | PaletteColorKey` colors.
 *
 * @param color - The color to test.
 * @param colorArr - Define the colorArr to test the color.
 * @returns Boolean
 */
export function testColor<Color>(
  color: Color,
  colorArr: string[] | undefined = componentColors
): boolean {
  return colorArr.includes(color as string);
}

/**
 * Use to define the component variant color and styles.
 *
 * This is an advanced style function, that generates 6 variants with 9 colors styles for component very easily.
 *
 * @param color - The color of the component, it supports only `"default" | "standard" | PaletteColorKey` colors.
 * @param options - The options use to manipulate the variant style.
 * @returns Customized variant styles ready to use.
 */
const componentVariantStyles = <
  <Color>(
    color: Color,
    options?: ComponentVariantStyleMethodOptions
  ) => ComponentVariantStyleReturnValue
>memoizeVariantStyles(
  (
    color: ComponentColors,
    options: ComponentVariantStyleMethodOptions = {}
  ): ComponentVariantStyleReturnValue => {
    const minimalTheme = useMinimalTheme();
    const minimalPalette = minimalTheme.palette;
    if (!testColor(color as ComponentColors)) color = "standard";

    /**
     * External Styles
     */
    const externalStyles = (theme: Theme) => ({
      ...variantBackgroundColor(
        theme,
        color,
        options?.backgroundColor,
        minimalPalette
      ),
      ...variantBoxShadows(color, options?.useBoxShadow, minimalTheme),
      ...variantDarkBorder(options?.useOutlinedBoxShadow),
      ...componentVariantMouseHoverEffects(theme, color, options),
    });

    return {
      filled: (theme) =>
        deepmerge(
          variantFilled(theme, color, minimalPalette),
          externalStyles(theme)
        ),
      outlined: (theme, disableBorder) =>
        deepmerge(
          {
            ...variantOutlined(theme, color, minimalPalette, disableBorder),
            backgroundColor: "transparent",
          },
          externalStyles(theme)
        ),
      text: (theme) =>
        deepmerge(
          {
            ...variantText(theme, color, minimalPalette),
            backgroundColor: "transparent",
          },
          externalStyles(theme)
        ),
      soft: (theme) =>
        deepmerge(
          variantSoft(theme, color, minimalPalette),
          externalStyles(theme)
        ),
      waterSoft: (theme) =>
        deepmerge(
          variantWaterSoft(theme, color, minimalPalette),
          externalStyles(theme)
        ),
      inverted: (theme) =>
        deepmerge(
          variantInverted(theme, color, minimalPalette),
          externalStyles(theme)
        ),
    };
  }
);

export const componentColors: ComponentColors[] = [
  "default",
  "standard",
  "primaryMain",
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
  "error",
];

export const componentVariants: ComponentVariants[] = [
  "filled",
  "outlined",
  "text",
  "soft",
  "waterSoft",
  "inverted",
];

/**
 * An internal function that creates the component variants styles object for component.
 *
 * @param variantsOptions - The variant style options to use on each variant.
 * @returns - A function that returns the component variants.
 */
export function createComponentVariantStyles(
  variantsOptions?: Partial<
    Record<ComponentVariants, ComponentVariantStyleMethodOptions>
  >
): <
  Color extends ComponentColors,
  VariantStyleOptions extends ComponentVariantStyleMethodOptions,
>(
  color: Color,
  overrideVariantOptions?: VariantStyleOptions
) => ComponentVariantStyleReturnValue {
  const variantStyleFun = <Color>(
    color: Color,
    overrideVariantOptions?: ComponentVariantStyleMethodOptions
  ): ComponentVariantStyleReturnValue => {
    const variants: Partial<ComponentVariantStyleReturnValue> = {};

    componentVariants.forEach((variant) => {
      variants[variant] = componentVariantStyles(
        color,
        overrideVariantOptions ?? variantsOptions?.[variant] ?? {}
      )[variant];
    });

    return variants as ComponentVariantStyleReturnValue;
  };

  return variantStyleFun;
}

/**
 * The color options for component.
 */
export type ComponentColors = PaletteColorKey | "default" | "standard";
/**
 * The variant options for component.
 */
export type ComponentVariants =
  | "filled"
  | "outlined"
  | "text"
  | "soft"
  | "waterSoft"
  | "inverted";

export interface OverridableVariantStyleOptions {
  /**
   * Overrides the default variant style options.
   */
  variantStyleOptions?: ComponentVariantStyleMethodOptions;
}

export interface ComponentVariantStyleReturnValue {
  /**
   * Defines the `filled` variant styles, it also can be used for `filled` variant.
   *
   * @param {Theme} theme - The mui Theme
   * @returns filled variant styles for component.
   */
  filled: (theme: Theme) => SxProps;
  /**
   * Defines the `outlined` variant styles.
   *
   * @param {Theme} theme - The mui Theme
   * @param {boolean} disableBorder - If it's true, the `borderWidth` and `borderStyle` will be removed.
   * @returns Outlined variant styles for component.
   */
  outlined: (theme: Theme, disableBorder?: boolean) => SxProps;
  /**
   * Defines the `text` variant styles.
   *
   * @param {Theme} theme - The mui Theme
   * @returns Text variant styles for component.
   */
  text: (theme: Theme) => SxProps;
  /**
   * Defines the `soft` variant styles.
   *
   * @param {Theme} theme - The mui Theme
   * @returns Soft variant styles for component.
   */
  soft: (theme: Theme) => SxProps;
  /**
   * Defines the `waterSoft` variant styles.
   *
   * @param {Theme} theme - The mui Theme
   * @returns Water Soft variant styles for component.
   */
  waterSoft: (theme: Theme) => SxProps;
  /**
   * Defines the `inverted` variant styles.
   *
   * @param {Theme} theme - The mui Theme
   * @returns Inverted variant styles for component.
   */
  inverted: (theme: Theme) => SxProps;
}

type VariantBackground =
  | "light"
  | "normal"
  | "main"
  | "dark"
  | "inverted"
  | "none";

export interface ComponentVariantStyleMethodOptions {
  /**
   * If it's true, the box-shadow will be applyed.
   * @default false
   */
  useBoxShadow?: boolean;
  /**
   * If it's true, the box-shadow will be applyed on mouse hover.
   * @default false
   */
  useBoxShadowOnHover?: boolean;
  /**
   * Defines the background color, this will override the default backgroundColor.
   * @default "none"
   */
  backgroundColor?: VariantBackground;
  /**
   * Defines the background color on mouse hover.
   * @default "light"
   */
  backgroundColorOnHover?: VariantBackground;
  /**
   * If it's true, the outlined box-shadow will be applyed on mouse hover.
   * @default false
   */
  useOutlinedBoxShadowOnHover?: boolean;
  /**
   * If it's true, the outlined box-shadow will be applyed.
   * @default false
   */
  useOutlinedBoxShadow?: boolean;
  /**
   * If it's true, the mouse hover will be disabled.
   * @default false
   */
  disableMouseHover?: boolean;
}

export default componentVariantStyles;
