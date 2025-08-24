"use client";

import * as React from "react";
import combineSxProps from "@/UI/utils/combineSxProps";
import { memoTheme, SlotProps } from "@/UI/material/utils";
import { styled } from "@/UI/styles/MuiStyles";
import { navItemRootStyles } from "@/UI/material/styles/customizations";
import { shouldForwardProp } from "@/UI/material/styles";

const ItemRoot = styled("li", {
  shouldForwardProp: (prop) => shouldForwardProp(prop),
})(memoTheme(({ theme }) => navItemRootStyles(theme) as TemplateStringsArray));

const NavItemRoot: NavItemRootComponent = ({
  itemId,
  children,
  component,
  ...props
}) => {
  return (
    <ItemRoot
      key={itemId}
      {...props}
      sx={combineSxProps(
        {
          [`&[aria-disabled="true"]`]: { cursor: "not-allowed" },
        },
        props?.sx
      )}
      as={component}
    >
      {children}
    </ItemRoot>
  );
};

interface NavItemRootComponent {
  (props: NavItemRootProps): React.JSX.Element;
  propTypes?: any;
}

export type NavItemRootProps<TOverirdes = {}> = {
  itemId: string;
} & SlotProps<"li", TOverirdes>;

export default NavItemRoot;
