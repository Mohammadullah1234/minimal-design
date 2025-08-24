"use client";

import * as React from "react";
import NavigationBarContext from "../contexts/NavigationBarContext";
import {
  NavigationBarItemThemeProps,
  NavigationBarOwnProps,
  NavigationBarSlotProps,
} from "../types";
import formatContextErrorMsg from "@/UI/utils/formatContextErrorMsg";

export type UseNavigationBarReturnValue<OtherItemDef extends object = {}> =
  Omit<
    Required<NavigationBarOwnProps<OtherItemDef>>,
    "open" | "itemTheme" | "slotProps" | "children" | "onOpen" | "onClose"
  > & {
    itemTheme: Omit<Required<NavigationBarItemThemeProps>, "icon"> & {
      icon: Required<NavigationBarItemThemeProps["icon"]>;
    };
    slotProps?: Partial<NavigationBarSlotProps<OtherItemDef>>;
  };

/**
 * Custome hook to access props and methods of `NavigationBar` component.
 */
export function useNavigationBar<
  OtherItemDef extends object = {},
>(): UseNavigationBarReturnValue<OtherItemDef> {
  const context = React.use(NavigationBarContext);
  if (context == null)
    formatContextErrorMsg("useNavigationBar", "NavigationBar");

  return context as UseNavigationBarReturnValue<OtherItemDef>;
}
