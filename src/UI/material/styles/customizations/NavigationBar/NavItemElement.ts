"use client";

import * as React from "react";
import { useNavigationBar, useNavItem } from "@/UI/material/NavigationBar";
import { SxProps, Theme } from "@/UI/styles/MuiStyles";

export function navItemElementStyles(): SxProps<Theme> {
  const { density } = useNavigationBar();
  const { item } = useNavItem();

  const memoizedStyles = React.useMemo(
    () => ({
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      display: "block",
      flex: "1 1 auto",
      lineHeight: 1.5,
      fontSize: "inherit",
      fontWeight: "inherit",
      transition: "text-align 300ms cubic-bezier(0.4, 0, 0.2, 1)",
    }),
    []
  );

  return {
    ...memoizedStyles,
    ...(density === "compact" &&
      item.type === "root" && {
        textAlign: "center",
      }),
  };
}
