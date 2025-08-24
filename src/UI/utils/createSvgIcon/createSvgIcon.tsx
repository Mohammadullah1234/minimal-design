"use strict";

import * as React from "react";
import SvgIcon, { SvgIconProps } from "@/UI/material/SvgIcon";

/**
 * Creates MUI SvgIcon.
 *
 * @param {React.ReactNode} path - Path of svg
 * @param displayName - The display Name of svg
 * @param componentProps - Optional component svg props
 * @returns A MUI SvgIcon
 */
export default function createSvgIcon(
  path: React.ReactNode,
  displayName: string,
  componentProps?: SvgIconProps
): typeof SvgIcon {
  function Component(props: SvgIconProps, ref: SvgIconProps["ref"]) {
    return (
      <SvgIcon
        aria-label={`${displayName}__icon`}
        ref={ref}
        {...componentProps}
        {...props}
        children={path}
      />
    );
  }

  if (process.env.NODE_ENV !== "production") {
    Component.displayName = `${displayName}Icon`;
  }

  return React.memo(React.forwardRef(Component)) as unknown as typeof SvgIcon;
}
