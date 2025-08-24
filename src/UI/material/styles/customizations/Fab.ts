"use client";

import { FabOwnProps } from "@/UI/material/Fab";
import { SxProps, Theme, CSSProperties } from "@/UI/styles/MuiStyles";
import { pxToRem } from "@/UI/utils/font";
import componentVariantStyles, {
  ComponentVariants,
} from "../componentVariantStyles";
import { useMinimalTheme } from "@/UI/styles/hooks";
import { useOverrideProps } from "../../OverridePropsProvider";

export function fabColorAndVariantStyles(
  color: FabOwnProps["color"],
  variantStyleOptions: FabOwnProps["variantStyleOptions"]
): Record<ComponentVariants, SxProps<Theme>> {
  return {
    filled: componentVariantStyles(
      color,
      variantStyleOptions ?? {
        useBoxShadow: true,
        backgroundColorOnHover: "dark",
      }
    ).filled,
    outlined: componentVariantStyles(
      color,
      variantStyleOptions ?? {
        useOutlinedBoxShadowOnHover: true,
      }
    ).outlined,
    text: componentVariantStyles(color, variantStyleOptions).text,
    soft: componentVariantStyles(
      color,
      variantStyleOptions ?? { backgroundColorOnHover: "normal" }
    ).soft,
    inverted: componentVariantStyles(
      color,
      variantStyleOptions ?? {
        backgroundColorOnHover: "normal",
      }
    ).inverted,
  } as Record<ComponentVariants, SxProps<Theme>>;
}

export const fabExtendedVariantSizes: Record<
  "small" | "medium" | "large",
  number
> = {
  small: 36,
  medium: 40,
  large: 48,
};

export const fabCircularVariantSizes: Record<
  "small" | "medium" | "large",
  number
> = {
  small: 40,
  medium: 48,
  large: 56,
};

export function fabStyles(): SxProps<Theme> {
  const fonts = useMinimalTheme().fonts;
  const overrideProps = useOverrideProps();

  return {
    textTransform: "unset",
    boxShadow: "none",
    letterSpacing: 0,
    fontWeight: 700,
    fontFamily: overrideProps?.fontFamily ?? fonts.publicSans,
    "&:hover": { boxShadow: "none" },
    "&:active": { boxShadow: "none" },
  };
}

export function fabSizesStyles(
  variant: FabOwnProps["variant"],
  size: FabOwnProps["size"] = "medium"
): Record<"small" | "medium" | "large", SxProps<Theme>> {
  const fabSize = fabExtendedVariantSizes[size as "small" | "medium" | "large"];

  const ciruclarStyles: CSSProperties = {
    width: `${fabCircularVariantSizes[size]}px`,
    height: `${fabCircularVariantSizes[size]}px`,
  };
  const extendedStyles: CSSProperties = {
    minWidth: `${fabSize}px`,
    minHeight: `${fabSize}px`,
    borderRadius: `calc(${fabSize}px / 2)`,
  };

  return {
    small: {
      fontSize: pxToRem(13),
      ...(variant === "circular"
        ? ciruclarStyles
        : {
            padding: "4px 8px",
            ...extendedStyles,
          }),
    },
    medium: {
      fontSize: pxToRem(14),
      ...(variant === "circular"
        ? ciruclarStyles
        : {
            padding: "6px 12px",
            ...extendedStyles,
          }),
    },
    large: {
      fontSize: pxToRem(15),
      ...(variant === "circular"
        ? ciruclarStyles
        : {
            padding: "8px 16px",
            ...extendedStyles,
          }),
    },
  };
}
