"use client";

import * as React from "react";
import mergeClasses from "@/UI/utils/mergeClasses";
import { SlotProps } from "@/UI/material/utils";
import { navItemClasses } from "../NavItem";
import { styled } from "@/UI/styles/MuiStyles";
import { navItemElementStyles } from "@/UI/material/styles/customizations";
import { shouldForwardProp } from "@/UI/material/styles";

const ItemElement = styled("div", {
  shouldForwardProp: (prop) => shouldForwardProp(prop),
})(() => navItemElementStyles() as TemplateStringsArray);

const NavItemElement: NavItemElementComponent = ({
  children,
  component,
  ...props
}) => {
  return (
    <ItemElement
      {...props}
      as={component}
      className={mergeClasses([navItemClasses.element, props?.className])}
    >
      {children}
    </ItemElement>
  );
};

interface NavItemElementComponent {
  (props: NavItemElementProps): React.JSX.Element;
  propTypes?: any;
}

export type NavItemElementProps<TOverirdes = {}> = SlotProps<"div", TOverirdes>;

export default NavItemElement;
