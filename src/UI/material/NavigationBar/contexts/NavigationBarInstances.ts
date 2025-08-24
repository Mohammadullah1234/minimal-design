"use client";

import * as React from "react";
import { UseNavigationBarInstancesReturnValue } from "../hooks";

const NavigationBarInstances =
  React.createContext<UseNavigationBarInstancesReturnValue | null>(null);

if (process.env.NODE_ENV !== "production") {
  NavigationBarInstances.displayName = "NavigationBarInstances";
}

export default NavigationBarInstances;
