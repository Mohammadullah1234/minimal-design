"use client";

import * as React from "react";
import { navItemClasses } from "../NavItem";
import combineSxProps from "@/UI/utils/combineSxProps";
import mergeClasses from "@/UI/utils/mergeClasses";
import { SlotProps } from "@/UI/material/utils";
import { useNavigationBar } from "../../hooks/useNavigationBar";
import { NavItemDef } from "../../types";
import { styled } from "@/UI/styles/MuiStyles";
import { navItemElementContainerStyles } from "@/UI/material/styles/customizations";
import { shouldForwardProp } from "@/UI/material/styles";

const ItemElementContainer = styled("div", {
  shouldForwardProp: (prop) => shouldForwardProp(prop),
})<Pick<NavItemElementContainerProps, "variant">>(
  ({ variant }) =>
    navItemElementContainerStyles(variant) as TemplateStringsArray
);

const NavItemElementContainer: NavItemElementContainerComponent = ({
  variant,
  children,
  component,
  ...props
}) => {
  const { hideSubHeader } = useNavigationBar();

  return hideSubHeader && variant === "header" ? null : (
    <ItemElementContainer
      className={mergeClasses([
        navItemClasses.elementContainer,
        props?.className,
      ])}
      {...props}
      as={component}
      variant={variant}
      sx={combineSxProps(props?.sx)}
    >
      {children}
    </ItemElementContainer>
  );
};

interface NavItemElementContainerComponent {
  (props: NavItemElementContainerProps): React.JSX.Element | null;
  propTypes?: any;
}

export type NavItemElementContainerProps<TOverrides = {}> = {
  variant: NavItemDef["variant"];
} & SlotProps<"div", TOverrides>;

export default NavItemElementContainer;
