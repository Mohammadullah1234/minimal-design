"use client";

import {
  navItemClasses,
  useNavigationBar,
  useNavItem,
} from "@/UI/material/NavigationBar";
import { SxProps, Theme } from "@/UI/styles/MuiStyles";
import { pxToRem } from "@/UI/utils/font";

export function navTransitionGroupCollapseStyles(): SxProps<Theme> {
  const {
    itemTheme: { icon, itemPL },
  } = useNavigationBar();

  return {
    transition: "height 300ms cubic-bezier(0.4, 0, 0.2, 1)",
    [`&.${navItemClasses.itemsTransitionGroup}`]: {
      paddingLeft: `calc(${itemPL}px + ${icon.fontSize}px / 2)`,
    },
  };
}

export function navTransitionGroupULStyles(): SxProps<Theme> {
  const { itemTheme, orientation } = useNavigationBar();

  return {
    display: "flex",
    flexDirection: orientation === "horizontal" ? "row" : "column",
    margin: 0,
    gap: `${itemTheme.gap}px`,
  };
}

export function navItemsTransitionGroupULStyles(theme: Theme): SxProps<Theme> {
  const {
    itemTheme: { subHeight, bulletSize },
  } = useNavigationBar();
  const { publicAPI } = useNavItem();
  const expantsionMode = publicAPI.getExpansionMode();

  return {
    position: "relative",

    ...(expantsionMode === "collapse"
      ? {
          paddingLeft: `${bulletSize}px`,
          paddingTop: "0.25rem",

          "&::before": {
            top: 0,
            left: 0,
            width: pxToRem(2),
            content: "''",
            position: "absolute",
            backgroundColor: " #EDEFF2",
            bottom: `calc(${subHeight}px - 2px - ${bulletSize}px / 2)`,

            ...theme.applyStyles("dark", {
              backgroundColor: " #282F37",
            }),
          },
        }
      : {}),
  };
}

export function navItemsPopperPaperStyles(): SxProps<Theme> {
  return {
    width: "180px",
    borderRadius: "12px",
    margin: "10px 5px",
    transition: "all 0.3s ease",
    padding: "4px",
  };
}
