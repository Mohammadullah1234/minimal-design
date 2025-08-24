"use client";

import { pxToRem } from "@/UI/utils/font";
import {
  Breakpoint,
  TypographyVariantsOptions,
  createTheme,
  SxProps,
  Theme,
} from "@/UI/styles/MuiStyles";
import { useMinimalTheme } from "@/UI/styles/hooks";
import { useOverrideProps } from "../../OverridePropsProvider";
import { TypographyOwnProps } from "../../Typography";
import componentVariantStyles, { testColor } from "../componentVariantStyles";

export type ResponsiveFontSizesInput = Partial<Record<Breakpoint, number>>;
export type ResponsiveFontSizesResult = Record<string, { fontSize: string }>;

/**
 * Use to define the responsive font-sizes for component.
 *
 * @param inputObject - The responsive fontSizes input object.
 * @returns - responsive fontSizes result
 */
export function responsiveFontSizes(
  inputObject: ResponsiveFontSizesInput
): ResponsiveFontSizesResult {
  const defaultMuiTheme = createTheme();
  const breakpoints: Breakpoint[] = defaultMuiTheme.breakpoints.keys;

  return breakpoints.reduce((acc, breakpoint) => {
    const value = inputObject[breakpoint];

    if (value !== undefined && value >= 0) {
      acc[defaultMuiTheme.breakpoints.up(breakpoint)] = {
        fontSize: pxToRem(value),
      };
    }

    return acc;
  }, {} as ResponsiveFontSizesResult);
}

export function typographyStyles(): SxProps<Theme> {
  const fonts = useMinimalTheme().fonts;
  const overrideProps = useOverrideProps();

  return {
    fontFamily: overrideProps?.fontFamily ?? fonts.dmSans,
  };
}

export function typographyColorStyles(
  theme: Theme,
  color: TypographyOwnProps["color"]
): SxProps<Theme> {
  if (!testColor(color)) return {};
  return componentVariantStyles(color, { disableMouseHover: true }).text(theme);
}

export type TypographyOptions = TypographyVariantsOptions & {
  fontSecondaryFamily: React.CSSProperties["fontFamily"];
  fontWeightSemiBold: React.CSSProperties["fontWeight"];
};

export function typographyVariantOptions(): Omit<
  TypographyOptions,
  "fontFamily" | "fontSecondaryFamily" | "fontWeightSemiBold"
> {
  const fonts = useMinimalTheme().fonts;
  const overrideProps = useOverrideProps();

  const secondaryFont = overrideProps?.fontSecondaryFamily ?? fonts.barlow;

  return {
    h1: {
      fontFamily: secondaryFont,
      fontWeight: 800,
      lineHeight: (80 / 64).toFixed(2),
      fontSize: pxToRem(40),
      ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
    },
    h2: {
      fontFamily: secondaryFont,
      fontWeight: 800,
      lineHeight: (64 / 48).toFixed(2),
      fontSize: pxToRem(32),
      ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
    },
    h3: {
      fontFamily: secondaryFont,
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(24),
      ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
    },
    h4: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(20),
      ...responsiveFontSizes({ md: 24 }),
    },
    h5: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(18),
      ...responsiveFontSizes({ sm: 19 }),
    },
    h6: {
      fontWeight: 600,
      lineHeight: (28 / 18).toFixed(2),
      fontSize: pxToRem(17),
      ...responsiveFontSizes({ sm: 18 }),
    },
    subtitle1: {
      fontWeight: 600,
      lineHeight: 1.5,
      fontSize: pxToRem(16),
    },
    subtitle2: {
      fontWeight: 600,
      lineHeight: (22 / 14).toFixed(2),
      fontSize: pxToRem(14),
    },
    body1: {
      lineHeight: 1.5,
      fontSize: pxToRem(16),
    },
    body2: {
      lineHeight: (22 / 14).toFixed(2),
      fontSize: pxToRem(14),
    },
    caption: {
      lineHeight: 1.5,
      fontSize: pxToRem(12),
    },
    overline: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(12),
      textTransform: "uppercase",
    },
    button: {
      fontWeight: 700,
      lineHeight: (24 / 14).toFixed(2),
      fontSize: pxToRem(14),
      textTransform: "unset",
    },
  };
}
