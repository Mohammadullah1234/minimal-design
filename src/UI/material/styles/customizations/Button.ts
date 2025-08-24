"use client";

import { pxToRem } from "@/UI/utils/font";
import { buttonClasses } from "@/UI/material/Button";
import { CSSProperties, SxProps, Theme } from "@/UI/styles/MuiStyles";
import { createComponentVariantStyles } from "../componentVariantStyles";
import { useMinimalTheme } from "@/UI/styles/hooks";
import { varAlpha } from "@/UI/styles/colorManipulator";
import { useOverrideProps } from "../../OverridePropsProvider";

export function buttonStyles(): SxProps<Theme> {
  const minimalTheme = useMinimalTheme();
  const overrideProps = useOverrideProps();

  return {
    gap: "1px",
    minWidth: 64,
    borderRadius: `${minimalTheme.palette.baseAction.borderRadius}px`,
    textTransform: "unset",
    boxShadow: "none",
    transition:
      "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1)",
    letterSpacing: 0,
    fontWeight: 700,
    fontFamily: overrideProps?.fontFamily ?? minimalTheme.fonts.publicSans,

    "--variant-textColor": "initial",
    "--variant-outlinedColor": "initial",
    "--variant-outlinedBorder": "initial",
    "--variant-containedColor": "initial",
    "--variant-containedBg": "initial",

    "&:active": { boxShadow: "none" },
  };
}

export const buttonColorAndVariantStyles = createComponentVariantStyles({
  filled: {
    backgroundColorOnHover: "dark",
    useBoxShadowOnHover: true,
  },
  outlined: {
    useOutlinedBoxShadowOnHover: true,
  },
  soft: {
    backgroundColorOnHover: "normal",
  },
  waterSoft: {
    backgroundColorOnHover: "normal",
  },
  inverted: {
    backgroundColorOnHover: "inverted",
  },
});

export const buttonSizesStyles: Record<
  "small" | "medium" | "large",
  CSSProperties
> = {
  small: {
    padding: "4px 8px",
    minHeight: "30px",
    fontSize: pxToRem(13),
    lineHeight: 1.69231,
  },
  medium: {
    padding: "6px 12px",
    minHeight: "36px",
    fontSize: pxToRem(14),
    lineHeight: 1.71429,
  },
  large: {
    padding: "8px 16px",
    minHeight: "48px",
    fontSize: pxToRem(15),
    lineHeight: 1.73333,
  },
};

export function buttonDisabledStyles<Variant>(
  theme: Theme,
  variant: Variant,
  disabledClass: string = buttonClasses.disabled
): SxProps<Theme> {
  const minimalPalette = useMinimalTheme().palette;

  return {
    [`&.${disabledClass}`]: {
      color: minimalPalette.baseAction.disabledLight,
      boxShadow: "none",
      ...(variant === "outlined"
        ? {
            borderColor: varAlpha(minimalPalette.grey["400Channel"], 0.5),
            background: "transparent",
            ...theme.applyStyles("dark", {
              borderColor: varAlpha(minimalPalette.grey["600Channel"], 0.4),
            }),
          }
        : variant !== "text"
          ? {
              background: minimalPalette.baseAction.disabledBackground,
            }
          : { background: "transparent" }),
      cursor: "default",
      pointerEvents: "none",
    },

    [`&.${buttonClasses.loadingPositionCenter}`]: {
      color: "transparent",
    },
    [`& .${buttonClasses.loadingIndicator}`]: {
      color: minimalPalette.baseAction.disabledLight,
    },
  };
}
