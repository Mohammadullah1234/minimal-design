"use client";

import { IconButtonOwnProps } from "@/UI/material/IconButton";
import { pxToRem } from "@/UI/utils/font";
import { SxProps, Theme } from "@/UI/styles/MuiStyles";
import componentVariantStyles, {
  ComponentVariants,
} from "../componentVariantStyles";

export function iconButtonStyles(): SxProps<Theme> {
  return {
    transition:
      "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1)",
  };
}

export function iconButtonColorAndVariantStyles(
  color: IconButtonOwnProps["color"] = "default"
): Record<ComponentVariants, SxProps<Theme>> {
  return {
    filled: componentVariantStyles(color, {
      backgroundColorOnHover: "dark",
    }).filled,
    outlined: componentVariantStyles(color, {
      useOutlinedBoxShadowOnHover: true,
    }).outlined,
    text: componentVariantStyles(color).text,
    soft: componentVariantStyles(color, { backgroundColorOnHover: "normal" })
      .soft,
    inverted: componentVariantStyles(color, {
      backgroundColorOnHover: "inverted",
    }).inverted,
  } as Record<ComponentVariants, SxProps<Theme>>;
}

export const iconButtonSizes: Record<"small" | "medium" | "large", number> = {
  small: 5,
  medium: 8,
  large: 12,
};

export const iconButtonSizesStyles: Record<
  "small" | "medium" | "large",
  SxProps<Theme>
> = {
  small: {
    padding: `${iconButtonSizes["small"]}px`,
    fontSize: pxToRem(18),
  },
  medium: {
    padding: `${iconButtonSizes["medium"]}px`,
    fontSize: pxToRem(24),
  },
  large: {
    padding: `${iconButtonSizes["large"]}px`,
    fontSize: pxToRem(28),
  },
};
