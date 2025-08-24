"use client";

import { SxProps, Theme } from "@/UI/styles/MuiStyles";

export function navigationTreeViewNavStyles(): SxProps<Theme> {
  return {
    paddingLeft: "calc(2 * var(--spacing))",
    paddingRight: "calc(2 * var(--spacing))",

    variants: [
      {
        props: {
          orientation: "horizontal",
        },
        style: {
          display: "flex",
          alignItems: "center",
          marginLeft: "auto",
        },
      },
      {
        props: {
          orientation: "vertical",
        },
        style: {
          paddingBottom: "calc(2 * var(--spacing))",
        },
      },
      {
        props: {
          density: "compact",
        },
        style: {
          "--spacing": "2px",
        },
      },
      {
        props: {
          density: "standard",
        },
        style: {
          "--spacing": "4px",
        },
      },
      {
        props: {
          density: "comfortable",
        },
        style: {
          "--spacing": "8px",
        },
      },
    ],
  } as SxProps<Theme>;
}

export function navigationTreeViewFooterSectionStyles(): SxProps<Theme> {
  return {
    "--spacing": "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flex: "1 1 auto",
    padding: "calc(2 * var(--spacing))",
  };
}
