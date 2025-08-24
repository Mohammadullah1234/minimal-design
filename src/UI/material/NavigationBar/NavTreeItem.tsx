"use client";

import * as React from "react";
import { useNavigationBar } from "./hooks/useNavigationBar";
import { useNavItem } from "./hooks/useNavItem";
import NavItemRoot from "./components/NavItemRoot";
import NavItemContainer from "./components/NavItemContainer";
import NavItemIcon from "./components/NavItemIcon";
import NavItemElementContainer from "./components/NavItemElementContainer";
import NavItemElement from "./components/NavItemElement";
import NavItemCaption from "./components/NavItemCaption";
import NavItemCaptionInfoIcon from "./components/NavItemCaptionInfoIcon";
import NavItemCollapseIcon from "./components/NavItemCollapseIcon";
import NavItemTransitionGroup from "./components/NavItemTransitionGroup";
import { NavItemDef } from "./types";

/**
 * The default NavItem.
 */
const NavTreeItem = (_: { itemId: NavItemDef["id"] }) => {
  const { orientation, density } = useNavigationBar();
  const {
    item: { variant, element, caption, children },
    getRootProps,
    getItemContainerProps,
    getItemIconProps,
    getItemCaptionProps,
    getCollapseIconProps,
    getTransitionGroupProps,
  } = useNavItem();

  return (
    <NavItemRoot {...getRootProps()}>
      <NavItemContainer {...getItemContainerProps()}>
        <NavItemIcon {...getItemIconProps("start")} />

        <NavItemElementContainer variant={variant}>
          <NavItemElement>{element}</NavItemElement>
          {caption &&
            orientation === "vertical" &&
            density === "comfortable" && (
              <NavItemCaption {...getItemCaptionProps()}>
                {caption}
              </NavItemCaption>
            )}
        </NavItemElementContainer>

        <NavItemIcon {...getItemIconProps("end")} />

        {caption && (orientation === "horizontal" || density === "compact") && (
          <NavItemCaptionInfoIcon captionText={caption} />
        )}

        {children && <NavItemCollapseIcon {...getCollapseIconProps()} />}
      </NavItemContainer>

      {children && <NavItemTransitionGroup {...getTransitionGroupProps()} />}
    </NavItemRoot>
  );
};

export default NavTreeItem;
