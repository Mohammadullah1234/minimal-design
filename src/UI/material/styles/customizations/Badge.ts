"use client";

import { pxToRem } from "@/UI/utils/font";
import { SxProps, Theme } from "@/UI/styles/MuiStyles";
import { useMinimalTheme } from "@/UI/styles/hooks";
import { BadgeProps } from "@/UI/material/Badge";
import { createComponentVariantStyles } from "../componentVariantStyles";
import { useOverrideProps } from "../../OverridePropsProvider";

export function badgeStyles(): SxProps<Theme> {
  const fonts = useMinimalTheme().fonts;
  const overrideProps = useOverrideProps();

  return {
    transition: "transform 225ms cubic-bezier(0.4, 0, 0.2, 1)",
    fontWeight: 700,
    fontFamily: overrideProps?.fontFamily ?? fonts.publicSans,
  };
}

export const badgeColorAndVariantStyles = createComponentVariantStyles({
  filled: { disableMouseHover: true },
  outlined: { disableMouseHover: true },
  text: { disableMouseHover: true },
  soft: { disableMouseHover: true },
  waterSoft: { disableMouseHover: true },
  inverted: { disableMouseHover: true },
});

export function badgeStatusStyles(
  status: BadgeProps["status"]
): SxProps<Theme> {
  const minimalPalette = useMinimalTheme().palette;

  return {
    minWidth: "auto",
    padding: 0,
    width: pxToRem(10),
    height: pxToRem(10),
    borderRadius: pxToRem(10),
    transform: "unset",
    "&::before, &::after": {
      content: "''",
      borderRadius: "1px",
      backgroundColor: minimalPalette.common.white,
    },

    ...(status === "always"
      ? {
          color: minimalPalette.grey["800"],
          backgroundColor: minimalPalette.warning.main,
          "&:before": {
            width: pxToRem(2),
            height: pxToRem(4),
            transform: "translate(1px, -1px)",
          },
          "&:after": {
            width: pxToRem(2),
            height: pxToRem(4),
            transform: "translate(0px, 1px) rotate(125deg)",
          },
        }
      : status === "online"
        ? {
            color: minimalPalette.grey["800"],
            backgroundColor: minimalPalette.success.main,
          }
        : status === "busy"
          ? {
              color: minimalPalette.grey["800"],
              backgroundColor: minimalPalette.error.main,
              "&:before": {
                width: pxToRem(6),
                height: pxToRem(2),
              },
            }
          : status === "offline"
            ? {
                color: minimalPalette.grey["800"],
                backgroundColor: minimalPalette.baseAction.disabledLight,
                "&:before": {
                  width: pxToRem(6),
                  height: pxToRem(6),
                  borderRadius: "50%",
                },
              }
            : {}),
  };
}
