"use client";

import * as React from "react";
import { styled } from "@/UI/styles/MuiStyles";
import Tooltip from "@mui/material/Tooltip";
import { NavItemDef } from "../../types";
import { memoTheme, SlotProps } from "@/UI/material/utils";
import navItemClasses from "../NavItem/navItemClasses";
import { navItemCaptionStyles } from "@/UI/material/styles/customizations";
import useSlotAndSlotProps from "@/UI/hooks/useSlotAndSlotProps";
import { shouldForwardProp } from "@/UI/material/styles";

const ItemCaptionStyled = styled("span", {
  shouldForwardProp: (prop) => shouldForwardProp(prop),
})(
  memoTheme(({ theme }) => navItemCaptionStyles(theme) as TemplateStringsArray)
);

const NavItemCaption: NavItemCaptionComponent = ({
  children,
  disableCaptionTooltip = false,
  rootComponent,
  ...props
}) => {
  const [ItemCaption, itemCaptionProps] = useSlotAndSlotProps(
    {
      slot: rootComponent,
      slotProps: props,
      elementType: ItemCaptionStyled,
      defaultProps: {
        className: navItemClasses.caption,
      },
    },
    [props]
  );

  const renderCaption = (
    <ItemCaption {...itemCaptionProps}>{children}</ItemCaption>
  );

  return disableCaptionTooltip ? (
    renderCaption
  ) : (
    <Tooltip title={children}>{renderCaption}</Tooltip>
  );
};

interface NavItemCaptionComponent {
  (props: NavItemCaptionProps): React.JSX.Element;
  propTypes?: any;
}

export interface NavItemCaptionOwnProps
  extends Pick<NavItemDef, "disableCaptionTooltip"> {
  /**
   * The component that renders the root slot.
   * @default "span"
   */
  rootComponent?: React.ElementType;
}

export type NavItemCaptionProps<TOverirdes = {}> = NavItemCaptionOwnProps &
  SlotProps<"span", TOverirdes>;
export default NavItemCaption;
