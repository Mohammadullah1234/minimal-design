"use client";

import { SxProps, Theme } from "@/UI/styles/MuiStyles";
import { chipClasses, ChipOwnProps } from "../../Chip";
import componentVariantStyles, {
  ComponentVariants,
} from "../componentVariantStyles";
import { pxToRem } from "@/UI/utils/font";
import { useMinimalTheme } from "@/UI/styles/hooks";
import { varAlpha } from "@/UI/styles/colorManipulator";
import { useOverrideProps } from "../../OverridePropsProvider";

export function chipStyles(): SxProps<Theme> {
  const minimalTheme = useMinimalTheme();
  const overrideProps = useOverrideProps();

  return {
    borderRadius: `${minimalTheme.palette.baseAction.borderRadius}px`,
    fontSize: pxToRem(13.5),
    lineHeight: 2,
    background: "transparent",
    fontWeight: 600,
    fontFamily: overrideProps?.fontFamily ?? minimalTheme.fonts.publicSans,

    "&:active": {
      boxShadow: "none",
    },
  };
}

export function chipAvatarStyles(
  theme: Theme,
  color: ChipOwnProps["color"] = "standard"
): SxProps<Theme> {
  return {
    [`& .${chipClasses.avatar}`]: {
      ...componentVariantStyles(color, {
        disableMouseHover: true,
        backgroundColor: "dark",
      }).filled(theme),

      ...(color === "warning"
        ? {
            color: "#fff",
          }
        : color === "default"
          ? theme.applyStyles("dark", {
              color: "#000",
            })
          : {}),
    },
  };
}

export function chipDeleteIconStyles(
  theme: Theme,
  variant: ChipOwnProps["variant"] = "filled",
  color: ChipOwnProps["color"] = "standard"
): SxProps<Theme> {
  return {
    [`& .${chipClasses.deleteIcon}`]: {
      color: "color-mix(in srgb, currentColor calc(0.6 * 100%), transparent)",

      ...(variant === "filled"
        ? {
            "&:hover": {
              color: color === "default" ? "#000" : "#fff",
            },
            ...theme.applyStyles("dark", {
              "&:hover": {
                color:
                  color === "standard" || color === "default" ? "#000" : "#fff",
              },
            }),
          }
        : variant === "soft" || variant === "inverted"
          ? {
              "&:hover": componentVariantStyles(color, {
                disableMouseHover: true,
              }).text,
            }
          : {
              "&:hover": componentVariantStyles(color, {
                disableMouseHover: true,
              }).text,
            }),
    },
  };
}

export function chipColorAndVariantStyles(
  clickable: ChipOwnProps["clickable"] = false,
  color: ChipOwnProps["color"] = "standard",
  variantStyleOptions: ChipOwnProps["variantStyleOptions"] = undefined
): Record<ComponentVariants, SxProps<Theme>> {
  return {
    filled: componentVariantStyles(
      color,
      variantStyleOptions ?? {
        backgroundColorOnHover: "dark",
        useBoxShadowOnHover: true,
        disableMouseHover: !clickable,
      }
    ).filled,
    outlined: componentVariantStyles(
      color,
      variantStyleOptions ?? {
        useOutlinedBoxShadowOnHover: true,
        disableMouseHover: !clickable,
      }
    ).outlined,
    text: componentVariantStyles(
      color,
      variantStyleOptions ?? {
        disableMouseHover: !clickable,
      }
    ).text,
    soft: componentVariantStyles(
      color,
      variantStyleOptions ?? {
        backgroundColorOnHover: "normal",
        disableMouseHover: !clickable,
      }
    ).soft,
    inverted: componentVariantStyles(
      color,
      variantStyleOptions ?? {
        backgroundColorOnHover: "inverted",
        disableMouseHover: !clickable,
      }
    ).inverted,
  } as Record<ComponentVariants, SxProps<Theme>>;
}

export function chipDisabledStyles(
  theme: Theme,
  variant: ChipOwnProps["variant"] = "filled"
): SxProps<Theme> {
  const minimalPalette = useMinimalTheme().palette;

  return {
    [`&.${chipClasses.disabled}`]: {
      opacity: 1,
      color: minimalPalette.baseAction.disabledLight,
      boxShadow: "none",
      ...(variant === "outlined"
        ? {
            borderColor: varAlpha(minimalPalette.grey["400Channel"], 0.5),
            ...theme.applyStyles("dark", {
              borderColor: varAlpha(minimalPalette.grey["600Channel"], 0.4),
            }),
          }
        : variant !== "text"
          ? {
              background: minimalPalette.baseAction.disabledBackground,
            }
          : {}),
      cursor: "default",
      pointerEvents: "none",

      [`& .${chipClasses.avatar}`]: {
        color: minimalPalette.baseAction.disabledLight,
        background: minimalPalette.baseAction.disabledBackground,
      },
    },
  };
}
