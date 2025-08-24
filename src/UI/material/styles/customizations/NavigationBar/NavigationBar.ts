"use client";

import useMediaQuery from "@/UI/hooks/useMediaQuery";
import { NavigationBarProps } from "@/UI/material/NavigationBar";
import { varAlpha } from "@/UI/styles/colorManipulator";
import { useMinimalTheme } from "@/UI/styles/hooks";
import { CSSProperties, SxProps, Theme } from "@/UI/styles/MuiStyles";
import { pxToRem } from "@/UI/utils/font";

export function navigationBarRootStyles(theme: Theme): SxProps<Theme> {
  const minimalPalette = useMinimalTheme().palette;

  return {
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    minHeight: "100%",
    background: minimalPalette.common.white,

    ...theme.applyStyles("dark", {
      background: minimalPalette.grey[900],
    }),
  };
}

export function navigationBarRootHorizontalContainerStyles(): SxProps<Theme> {
  return {
    position: "sticky",
    top: 0,
    left: 0,
    zIndex: 1200,
  };
}

const navigationBarRootNavVariants = (
  width: number,
  height: number
): Record<
  Required<NavigationBarProps>["orientation"],
  Record<Required<NavigationBarProps>["density"], CSSProperties>
> => ({
  horizontal: {
    compact: {
      height,
    },
    standard: {
      height,
    },
    comfortable: {
      height,
    },
  },
  vertical: {
    compact: {
      width,
      height: "100%",
    },
    standard: {
      width,
      height: "100%",
    },
    comfortable: {
      width,
      height: "100%",
    },
  },
});

export function navigationBarRootNavStyles(
  theme: Theme,
  width: number,
  height: number,
  orientation: Required<NavigationBarProps>["orientation"],
  density: Required<NavigationBarProps>["density"],
  hideSubHeader: Required<NavigationBarProps>["hideSubHeader"]
): SxProps {
  const minimalPalette = useMinimalTheme().palette;
  const mobileMode = useMediaQuery(theme.breakpoints.down("md"));

  return {
    width,
    background: minimalPalette.common.white,
    border: "1px solid",
    display: "flex",
    flexDirection: "column",
    borderColor: varAlpha(minimalPalette.grey["500Channel"], "12%"),
    borderRadius: `${minimalPalette.baseAction.borderRadius}px`,
    boxShadow: "none",
    position: orientation === "horizontal" ? "sticky" : "fixed",
    top: 0,
    left: 0,
    zIndex: 1200,
    transition: "width 120ms linear 0ms",

    ...navigationBarRootNavVariants(width, height)[
      orientation as Required<NavigationBarProps>["orientation"]
    ][density as Required<NavigationBarProps>["density"]],

    ...(!hideSubHeader &&
      orientation === "horizontal" && {
        height: "auto",
      }),
    ...(orientation === "horizontal" || mobileMode
      ? {
          width: "100%",
          flexDirection: "row",
        }
      : {}),

    ...theme.applyStyles("dark", {
      background: minimalPalette.grey[900],
    }),
  };
}

export function navigationBarLayoutStyles(
  theme: Theme,
  orientation: NavigationBarProps["orientation"],
  width: number
): SxProps<Theme> {
  return {
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    transition: "padding-left 120ms linear 0ms",

    ...(orientation === "vertical" && {
      [theme.breakpoints.up("lg")]: {
        paddingLeft: width,
      },
    }),
  };
}

export function navigationBarMainStyles(): SxProps<Theme> {
  return {
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
  };
}

export function navigationBarMainContainerStyles(theme: Theme): SxProps<Theme> {
  return {
    "--spacing": "8px",
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    paddingLeft: "calc(2 * var(--spacing))",
    paddingRight: "calc(2 * var(--spacing))",
    paddingTop: "var(--spacing)",
    paddingBottom: "calc(8 * var(--spacing))",

    [theme.breakpoints.up("sm")]: {
      paddingLeft: "calc(3 * var(--spacing))",
      paddingRight: "calc(3 * var(--spacing))",
    },

    [theme.breakpoints.up("lg")]: {
      paddingLeft: "calc(5 * var(--spacing))",
      paddingRight: "calc(5 * var(--spacing))",
    },
  };
}
export function navigationBarHeaderSectionStyles(_: Theme): SxProps<Theme> {
  return {
    "--spacing": "8px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    padding: "calc(2 * var(--spacing))",
    position: "sticky",
    top: 0,
  };
}

export function navigatonBarToggleDensityButtonStyles(
  theme: Theme
): SxProps<Theme> {
  const minimalPalette = useMinimalTheme().palette;

  return {
    position: "absolute",
    top: 8,
    right: 0,
    transform: "translate(50%, 50%)",
    border: "1px solid",
    borderColor: varAlpha(minimalPalette.grey["500Channel"], "12%"),
    background: minimalPalette.common.white,

    "& svg": {
      fontSize: pxToRem(18),
    },

    ...theme.applyStyles("dark", {
      background: minimalPalette.grey[900],
    }),
  };
}

export function navigationBarSwipeableDrawerStyles(
  theme: Theme
): SxProps<Theme> {
  const minimalTheme = useMinimalTheme();

  return {
    "& .MuiPaper-root": {
      position: "relative",
      width: 288,
      height: "100vh",
      background: minimalTheme.palette.common.white,
      borderColor: varAlpha(minimalTheme.palette.grey["500Channel"], "12%"),
      overflow: "hidden",
      boxShadow: minimalTheme.createShadow(
        minimalTheme.palette.common.blackChannel
      ).z24,

      ...theme.applyStyles("dark", {
        background: minimalTheme.palette.grey[900],
      }),
    },
  };
}
