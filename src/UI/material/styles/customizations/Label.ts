"use client";

import { SxProps, Theme } from "@/UI/styles/MuiStyles";
import { pxToRem } from "@/UI/utils/font";
import componentVariantStyles, {
  ComponentVariants,
} from "../componentVariantStyles";
import { LabelOwnProps } from "../../Label";
import { useMinimalTheme } from "@/UI/styles/hooks";
import { useOverrideProps } from "../../OverridePropsProvider";

export function labelMemoizedStyles(): SxProps<Theme> {
  return {
    "--spacing": "10px",

    minWidth: 24,
    height: 24,
    flexShrink: 0,
    lineHeight: 1.5,
    cursor: "default",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
    gap: "calc(0.75 * var(--spacing))",
    padding: "0px calc(0.75 * var(--spacing))",
    fontSize: pxToRem(12),
    fontWeight: 700,
    borderRadius: "6px",
    boxShadow: "none",
    transition:
      "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1)",

    variants: [
      {
        props: {
          size: "large",
        },
        style: {
          minWidth: 26,
          height: 26,
          fontSize: pxToRem(13),
        },
      },
    ],
  } as SxProps<Theme>;
}

export function labelIconStyles(): SxProps<Theme> {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "& svg": {
      fontSize: pxToRem(16),
    },

    variants: [
      {
        props: {
          size: "large",
        },
        style: {
          "& svg": {
            fontSize: pxToRem(18),
          },
        },
      },
      {
        props: {
          type: "start",
        },
        style: {
          marginLeft: "-1px",
          marginRight: "-2px",
        },
      },
      {
        props: {
          type: "end",
        },
        style: {
          marginRight: "-1px",
          marginLeft: "-2px",
        },
      },
    ],
  } as SxProps<Theme>;
}

export function labelStyles(): SxProps<Theme> {
  const fonts = useMinimalTheme().fonts;
  const overrideProps = useOverrideProps();

  return {
    fontFamily: overrideProps?.fontFamily ?? fonts.publicSans,
  };
}

export function labelColorAndVariantStyles(
  color: LabelOwnProps["color"] = "standard",
  variantStyleOptions: LabelOwnProps["variantStyleOptions"]
): Record<ComponentVariants, SxProps<Theme>> {
  return {
    filled: componentVariantStyles(
      color,
      variantStyleOptions ?? {
        disableMouseHover: true,
      }
    ).filled,
    outlined: componentVariantStyles(
      color,
      variantStyleOptions ?? {
        disableMouseHover: true,
        useOutlinedBoxShadow: true,
      }
    ).outlined,
    text: componentVariantStyles(
      color,
      variantStyleOptions ?? {
        disableMouseHover: true,
      }
    ).text,
    soft: componentVariantStyles(
      color,
      variantStyleOptions ?? {
        disableMouseHover: true,
      }
    ).soft,
    waterSoft: componentVariantStyles(
      color,
      variantStyleOptions ?? {
        disableMouseHover: true,
      }
    ).waterSoft,
    inverted: componentVariantStyles(
      color,
      variantStyleOptions ?? {
        disableMouseHover: true,
      }
    ).inverted,
  } as Record<ComponentVariants, SxProps<Theme>>;
}
