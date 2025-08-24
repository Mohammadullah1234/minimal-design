"use client";

import * as React from "react";
import { UseNavItemReturnValue } from "../hooks/useNavItem";

const NavItemContext = React.createContext<UseNavItemReturnValue | null>(null);

if (process.env.NODE_ENV !== "production") {
  NavItemContext.displayName = "NavItemContext";
}

export default NavItemContext;
