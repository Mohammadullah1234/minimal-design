"use client";

import * as React from "react";
import { useNavigationBar, useNavItem } from "@/UI/material/NavigationBar";
import {
  navItemClasses,
  NavItemContainerOwnProps,
} from "@/UI/material/NavigationBar/components";
import { CSSProperties, SxProps, Theme } from "@/UI/styles/MuiStyles";
import {
  navItemActiveStyles,
  navItemSelectedStyles,
  renderStatusStyles,
} from "./helpers";
import { pxToRem } from "@/UI/utils/font";
import { useMinimalTheme } from "@/UI/styles/hooks";
import { varAlpha } from "@/UI/styles/colorManipulator";

const activeClass = navItemClasses.active;
const expandedClass = navItemClasses.expanded;
const selectedClass = navItemClasses.selected;

// for item -------------------------------------------
export function navItemDisabledStyles(): CSSProperties {
  const minimalPalette = useMinimalTheme().palette;

  return {
    [`&.${navItemClasses.disabled}`]: {
      opacity: minimalPalette.baseAction.disabledOpacity,
      pointerEvents: "none",
      cursor: "default",
    },
  };
}

export function navItemStyles(
  theme: Theme,
  type: NavItemContainerOwnProps["type"]
): SxProps<Theme> {
  const minimalPalette = useMinimalTheme().palette;
  const {
    itemTheme: { rootHeight, itemPT, itemPR, itemPB, itemPL },
    orientation,
    density,
  } = useNavigationBar();

  const memoizedStyles = React.useMemo(
    () => ({
      margin: "0",
      width: "100%",
      gap: "6px",
      overflow: "hidden",
      color: minimalPalette.grey[600],
      position: "relative",
      alignContent: "center",
      justifyContent: "flex-start",
      fontSize: pxToRem(14),
      transition: "font-size 200ms cubic-bezier(0.4, 0, 0.2, 1)",

      "&:hover": {
        background: minimalPalette.baseAction.hover,
      },
      ...navItemDisabledStyles(),

      ...theme.applyStyles("dark", {
        color: minimalPalette.grey[500],
      }),
    }),
    []
  );

  let padding = "0";

  if (orientation === "horizontal") {
    if (density === "compact")
      padding = `${itemPT}px ${itemPR - 5}px ${itemPB}px ${itemPL - 5}px`;
    else padding = `${itemPT}px ${itemPR - 3}px ${itemPB}px ${itemPL - 3}px`;
  }
  if (orientation === "vertical") {
    if (density === "compact")
      padding = `${itemPT + 4}px ${itemPR - 4}px ${itemPB + 4}px ${itemPL - 4}px`;
    else padding = `${itemPT}px ${itemPR}px ${itemPB}px ${itemPL}px`;
  }

  return {
    padding,
    minHeight:
      orientation === "horizontal"
        ? rootHeight - (density === "compact" ? 12 : 9)
        : rootHeight,
    borderRadius: `${minimalPalette.baseAction.borderRadius}px`,
    ...memoizedStyles,

    ...(density === "compact" &&
      orientation === "vertical" &&
      type === "root" && {
        flexDirection: "column",
        justifyContent: "center",
        fontSize: pxToRem(10),
      }),

    ...(density === "compact" &&
      orientation === "horizontal" &&
      type === "root" && {
        fontSize: pxToRem(12),
      }),

    // "&::before": {
    //   content: '""',
    //   position: "absolute",
    //   borderRadius: "50%",
    //   width: "0.35rem",
    //   height: "0.35rem",
    //   background: "currentColor",
    //   left: "0.1rem",
    //   opacity: 0,
    //   transition: "opacity 0.3s ease",
    // },
  } as SxProps<Theme>;
}

export function navSubItemStyles(theme: Theme): SxProps<Theme> {
  const {
    itemTheme: { subHeight, bulletSize },
  } = useNavigationBar();
  const { publicAPI } = useNavItem();
  const expantsionMode = publicAPI.getExpansionMode();

  return {
    minHeight: subHeight,
    overflow: "visible",

    ...(expantsionMode === "collapse"
      ? {
          "&::before": {
            content: '""',
            width: bulletSize,
            height: bulletSize,
            background: "transparent",
            borderBottom: "2px solid",
            borderLeft: "2px solid",
            borderColor: " #EDEFF2",
            position: "absolute",
            left: 0,
            borderRadius: "0 0 0 0.5rem",
            transform: `translate(calc(${bulletSize}px * -1), calc(${bulletSize}px * -0.4))`,

            ...theme.applyStyles("dark", {
              borderColor: " #282F37",
            }),
          },
        }
      : {}),
  };
}

export function navItemStatusStyles(theme: Theme): SxProps<Theme> {
  const minimalPalette = useMinimalTheme().palette;

  const { itemTheme } = useNavigationBar();
  const {
    status,
    item: { type },
  } = useNavItem();

  if (type === "root")
    return renderStatusStyles({
      active: status.isActive,
      activeStyles: {
        [`&.${activeClass}`]: navItemActiveStyles(itemTheme.active, theme, {
          color: minimalPalette.primaryMain.main,
          background: varAlpha(
            minimalPalette.primaryMain.mainChannel,
            minimalPalette.baseAction.hoverOpacity
          ),

          "&:hover": {
            background: varAlpha(minimalPalette.primaryMain.mainChannel, 0.15),
          },

          ...theme.applyStyles("dark", {
            color: minimalPalette.primaryMain.light,
          }),
        }),
      },
      expanded: status.isExpanded,
      expandedStyles: {
        [`&.${expandedClass}`]: navItemSelectedStyles(
          itemTheme.expanded,
          theme
        ),
      },
      selected: status.isSelected,
      selectedStyles: {
        [`&.${selectedClass}`]: navItemSelectedStyles(
          itemTheme.selected,
          theme
        ),
      },
    });

  return renderStatusStyles({
    active: status.isActive,
    activeStyles: {
      [`&.${activeClass}`]: navItemActiveStyles(itemTheme.subActive, theme),
    },
    expanded: status.isExpanded,
    expandedStyles: {
      [`&.${expandedClass}`]: navItemSelectedStyles(
        itemTheme.subExpanded,
        theme
      ),
    },
    selected: status.isSelected,
    selectedStyles: {
      [`&.${selectedClass}`]: navItemSelectedStyles(
        itemTheme.subSelected,
        theme
      ),
    },
  });
}

// for header -------------------------------------------
export function navItemHeaderStyles(theme: Theme): SxProps<Theme> {
  const minimalPalette = useMinimalTheme().palette;

  const { orientation, itemTheme } = useNavigationBar();
  const spacing = `${itemTheme.spacing}px`;

  const memoizedStyles = React.useMemo(
    () => ({
      width: "100%",
      color: minimalPalette.baseAction.disabledLight,
      borderRadius: "50px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "flex-start",
      position: "relative",
      fontWeight: 700,
      fontSize: pxToRem(11),
      transition: "padding-left 300ms cubic-bezier(0.4, 0, 0.2, 1)",

      [`& .${navItemClasses.collapseIcon}`]: {
        position: "absolute",
        left: `-4px`,

        "& svg": {
          opacity: 0,
          transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        },
      },
      ...navItemDisabledStyles(),

      ...theme.applyStyles("dark", {
        color: minimalPalette.baseAction.disabledDark,
      }),
    }),
    []
  );

  let padding = "0";

  if (orientation === "horizontal")
    padding = `${spacing} ${spacing} ${spacing} calc(1.5 * ${spacing})`;
  else
    padding = `calc(2 * ${spacing}) ${spacing} ${spacing} calc(1.5 * ${spacing})`;

  return {
    padding,
    gap: spacing,
    ...memoizedStyles,

    "&:hover": {
      paddingLeft: `calc(2 * ${spacing})`,
      color: minimalPalette.common.black,

      [`& .${navItemClasses.collapseIcon} svg`]: {
        opacity: 1,
      },

      ...theme.applyStyles("dark", {
        color: minimalPalette.common.white,
      }),
    },
  } as SxProps<Theme>;
}

/**
 * for nav item loading
 */
export function navItemLoadingWrapperStyles(theme: Theme): SxProps<Theme> {
  const minimalPalette = useMinimalTheme().palette;

  return {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
    borderRadius: `${minimalPalette.baseAction.borderRadius}px`,
    zIndex: 99,
    background: varAlpha(minimalPalette.common.blackChannel, 0.04),
    opacity: minimalPalette.baseAction.disabledOpacity,

    ...theme.applyStyles("dark", {
      background: varAlpha(minimalPalette.common.whiteChannel, 0.04),
    }),
  };
}
