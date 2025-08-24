"use client";

import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import { ITEMS } from "@/app/layout/minimalDashboard/data";
import { cardMediaMainProps } from "@/UI/Functions";
import NavigationBar, {
  NavigationBarProps,
  NavigationBarSlotsAndSlotProps,
  navItemClasses,
  useNavigationBarInstances,
} from "@/UI/material/NavigationBar";
import { useMinimalTheme } from "@/UI/styles/hooks";
import { varAlpha } from "@/UI/styles/colorManipulator";
import { usePageLoader } from "../layout/minimalDashboard";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Avatar from "@/UI/material/Avatar";
import Stack from "@/UI/material/Stack";
import IconButton from "@/UI/material/IconButton";
import { Menu } from "@/UI/icons/minimal";

const LayoutNavigationBar = React.memo(
  ({
    open,
    onOpen,
    onClose,
    children,
  }: Required<
    Pick<NavigationBarProps, "open" | "onClose" | "onOpen" | "children">
  >) => {
    const minimalTheme = useMinimalTheme();

    const { startLoading } = usePageLoader();
    const navigationBarItems = React.useCallback(ITEMS, []);

    const navigationBarItemTheme: NavigationBarProps["itemTheme"] =
      React.useMemo(
        () => ({
          active: (theme) => ({
            color: minimalTheme.palette.primaryMain.main,
            background: varAlpha(
              minimalTheme.palette.primaryMain.mainChannel,
              minimalTheme.palette.baseAction.hoverOpacity
            ),

            "&:hover": {
              background: varAlpha(
                minimalTheme.palette.primaryMain.mainChannel,
                0.15
              ),
            },

            ...theme.applyStyles("dark", {
              color: minimalTheme.palette.primaryMain.light,
            }),
          }),
        }),
        []
      );

    const navigationBarSlotProps: NavigationBarSlotsAndSlotProps["slotProps"] =
      React.useMemo(
        () => ({
          itemDef: ({ children }, { isExternalLink, isLink, isActive }) => {
            return {
              component: isLink ? Link : "div",
              slotProps: {
                item: {
                  onClick: (e) => {
                    if (isLink && !children && !isExternalLink) {
                      onClose(e);
                      if (!isActive) startLoading();
                    }
                  },
                },
              },
            };
          },
        }),
        []
      );

    return (
      <NavigationBar
        items={navigationBarItems}
        itemTheme={navigationBarItemTheme}
        slotProps={navigationBarSlotProps}
        usePathname={usePathname}
        headerContainer={HeaderContainer}
        headerSection={React.useMemo(
          () => (
            <Avatar sx={{ background: "transparent" }}>
              <CardMedia {...cardMediaMainProps(minimalTheme.images.logo)} />
            </Avatar>
          ),
          []
        )}
        children={children}
      />
    );
  }
);

const HeaderContainer = () => {
  const { onOpen } = useNavigationBarInstances();

  return (
    <>
      <Stack
        sx={{
          height: 50,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          position: "sticky",
          top: 0,
          left: 0,
        }}
      >
        <IconButton onClick={onOpen}>
          <Menu />
        </IconButton>
      </Stack>
    </>
  );
};

export default LayoutNavigationBar;
