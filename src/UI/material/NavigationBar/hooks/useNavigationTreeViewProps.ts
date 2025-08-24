"use client";

import * as React from "react";
import NavigationTreeViewContext from "../contexts/NavigationTreeViewContext";
import { UseNavigationTreeViewReturnValue } from "../internal-hooks/useNavigationTreeView";
import { NavigationTreeViewOwnProps } from "../NavigationTreeView";
import formatContextErrorMsg from "@/UI/utils/formatContextErrorMsg";

export interface UseNavigationTreeViewPropsReturnValue<
  OtherItemDef extends object = {},
> extends UseNavigationTreeViewReturnValue<OtherItemDef>,
    Omit<NavigationTreeViewOwnProps, "menuOpen"> {}

/**
 * Custome hook to access the `store`, `publicAPI` and `instance` and other props from `NavigationTreeView` component.
 */
export function useNavigationTreeViewProps<
  OtherItemDef extends object = {},
>(): UseNavigationTreeViewPropsReturnValue<OtherItemDef> {
  const context = React.use(NavigationTreeViewContext);

  if (context == null)
    formatContextErrorMsg("useNavigationTreeViewProps", "NavigationTreeView");

  return context as unknown as UseNavigationTreeViewPropsReturnValue<OtherItemDef>;
}
