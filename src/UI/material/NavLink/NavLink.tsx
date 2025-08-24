"use client";

import { usePathname } from "next/navigation";
import { NavLinkProps } from "./NavLinkProps";
import NextLink from "next/link";
import Box from "@/UI/material/Box";
import { memo } from "react";
import combineSxProps from "@/UI/utils/combineSxProps";
import mergeClasses from "@/UI/utils/mergeClasses";

const NavLink = memo(
  ({
    exactPath = true,
    removeActiveClass = false,
    href,
    children,
    ...props
  }: NavLinkProps) => {
    const pathname = usePathname();
    const isActive = exactPath ? pathname === href : pathname.startsWith(href);

    return (
      <Box
        {...props}
        component={NextLink}
        href={href}
        className={mergeClasses([
          props?.className || "",
          removeActiveClass ? "" : isActive ? "active" : "",
        ])}
        sx={combineSxProps({ display: "block" }, props?.sx)}
      >
        {children}
      </Box>
    );
  }
);

export default NavLink;
