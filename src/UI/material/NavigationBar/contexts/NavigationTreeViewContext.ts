"use client";

import * as React from "react";
import { UseNavigationTreeViewPropsReturnValue } from "../hooks";

const NavigationTreeViewContext =
  React.createContext<UseNavigationTreeViewPropsReturnValue<{}> | null>(null);

if (process.env.NODE_ENV !== "production") {
  NavigationTreeViewContext.displayName = "NavigationTreeViewContext";
}

export default NavigationTreeViewContext;
