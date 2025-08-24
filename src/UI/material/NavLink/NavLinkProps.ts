import * as React from "react";
import { LinkProps } from "next/link";
import { BoxOwnProps } from "@mui/system";

export type NavLinkProps = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> &
  Omit<BoxOwnProps, "component"> & {
    children?: React.ReactNode | undefined;
    /**
     * if it's true, the active className will applied to the exact pathname.
     * @default true
     */
    exactPath?: boolean;
    /**
     * if it's true, the active will be removed.
     * @default false
     */
    removeActiveClass?: boolean;
  } & React.RefAttributes<HTMLAnchorElement>;

export * from "next/link";
