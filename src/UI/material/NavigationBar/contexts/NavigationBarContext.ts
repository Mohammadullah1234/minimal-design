"use client";

import * as React from "react";
import { UseNavigationBarReturnValue } from "../hooks/useNavigationBar";

const NavigationBarContext =
  React.createContext<UseNavigationBarReturnValue | null>(null);

if (process.env.NODE_ENV !== "production") {
  NavigationBarContext.displayName = "NavigationBarContext";
}

export default NavigationBarContext;
