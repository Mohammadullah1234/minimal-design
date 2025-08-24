"use client";

import Badge, { BadgeProps } from "@mui/material/Badge";
import { BadgeStyles } from "./NavBadgeStyles";
import { memo } from "react";
import { useNavbar } from "../../Navbar";
import combineSxProps from "@/UI/utils/combineSxProps";

const NavBadge = memo(
  ({
    children,
    badgeAnimation = false,
    dotLighting = false,
    ...props
  }: NavBadgeProps) => {
    const { navBadgeProps } = useNavbar();

    return (
      <>
        <Badge
          {...navBadgeProps}
          {...props}
          sx={combineSxProps(
            (theme) =>
              BadgeStyles(
                theme,
                badgeAnimation,
                dotLighting,
                props?.badgeContent,
                props?.color,
                props?.variant
              ),
            navBadgeProps?.sx,
            props?.sx
          )}
        >
          {children}
        </Badge>
      </>
    );
  }
);

export interface NavBadgeProps extends BadgeProps {
  /**
   * if it's `true`, this will show a simple animation on Badge
   * @default false
   */
  badgeAnimation?: boolean;
  /**
   * if it's `true`, this will show a lighting animation on Badge like on or off
   * @default false
   */
  dotLighting?: boolean;
}

export default NavBadge;
