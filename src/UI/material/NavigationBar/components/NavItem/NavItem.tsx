"use client";

import * as React from "react";
import { NavItemDef } from "../../types";
import navItemClasses from "./navItemClasses";
import mergeClasses from "@/UI/utils/mergeClasses";
import NavItemContext from "../../contexts/NavItemContext";
import { initialNavItemProps } from "../../initialProps";
import NavTreeItem from "../../NavTreeItem";
import {
  NavItemTransitionGroupOwnerState,
  NavItemTransitionGroupType,
} from "../NavItemTransitionGroup";
import { useNavigationBar } from "../../hooks/useNavigationBar";
import { useNavigationTreeViewProps } from "../../hooks/useNavigationTreeViewProps";
import { UseNavItemReturnValue } from "../../hooks/useNavItem";
import {
  useNavItemUtils,
  UseNavItemUtilsParameters,
} from "../../internal-hooks/useNavItemUtils";
import combineSxProps from "@/UI/utils/combineSxProps";
import { SxProps, Theme } from "@/UI/styles/MuiStyles";
import resolveSelector from "@/UI/utils/resolveSelector";
import mergeProps from "@/UI/utils/mergeProps";

/**
 * This is the main `NavItem` component that generates the nav Item.
 *
 * The `NavItem` component must be within a `NavigationBar` component and inside `NavigationTreeView` component.
 *
 * @requires useNavigationBar Hook
 * @requires useNavigationTreeViewProps Hook
 */
const NavItem = <OtherItemDef extends object = {}>(props: NavItemProps) => {
  const { itemId } = props;
  type ItemDef = NavItemDef<OtherItemDef>;

  const {
    usePathname,
    orientation,
    slots: NavigationBarSlots,
    slotProps: NavigationBarSlotProps,
    itemTheme,
    hideSubHeader,
  } = useNavigationBar();

  const treeViewProps = useNavigationTreeViewProps();
  const { publicAPI, instance } = treeViewProps;

  const rootRef = React.useRef<HTMLLIElement | null>(null);
  const item: Required<ItemDef> = (publicAPI.getItem(itemId, true) ??
    initialNavItemProps) as Required<ItemDef>;

  const {
    parentId,
    variant = "item",
    type = "root",
    href,
    external = false,
    children: itemChildren,
    caption,
    startIcon,
    endIcon,
  } = item;

  const {
    status,
    component: Component,
    disableIconOnDesktop: DisableIconOnDesktop,
    disableIconOnMobile: DisableIconOnMobile,
    disableCaptionTooltip: DisableCaptionTooltip,
    slots,
    slotProps,
    getExpanded,
    selectable,
    expandable,
    expansionMode,
    selectionMode,
  } = useNavItemUtils({
    itemId,
    itemDef: NavigationBarSlotProps?.itemDef,
    item,
    usePathname,
    ...treeViewProps,
  } as unknown as UseNavItemUtilsParameters<ItemDef>);

  const { isActive, isDisabled, isLoading, isExpanded, isLink, isSelected } =
    status;

  /**
   * Item classes
   */
  const itemClasses = mergeClasses([
    ...(variant === "header"
      ? [navItemClasses.header, slotProps?.header?.className]
      : [navItemClasses.item, slotProps?.item?.className]),
    isActive && navItemClasses.active,
    isSelected && navItemClasses.selected,
    isExpanded && navItemClasses.expanded,
    isDisabled && navItemClasses.disabled,
    isLink && navItemClasses.link,
  ]);

  /**
   * getRootProps
   */
  const getRootProps: UseNavItemReturnValue["getRootProps"] = React.useMemo(
    () =>
      ((externalProps = {} as any) => {
        return mergeProps([
          {
            id: itemId,
            ref: rootRef,
            ...(isSelected ? { "aria-selected": isSelected } : {}),
            ...(isExpanded ? { "aria-expanded": isExpanded } : {}),
            ...(isDisabled ? { "aria-disabled": isDisabled } : {}),
            ...(isActive ? { "data-active": isActive } : {}),
            ...(isLoading ? { "data-loading": isLoading } : {}),
            className: navItemClasses.root,
          },
          NavigationBarSlotProps?.item,
          externalProps,
        ]);
      }) as UseNavItemReturnValue["getRootProps"],
    [
      itemId,
      rootRef,
      isSelected,
      isExpanded,
      isDisabled,
      isActive,
      caption,
      itemTheme.subHeight,
    ]
  );

  /**
   * getItemContainerProps
   */
  const getItemContainerProps: UseNavItemReturnValue["getItemContainerProps"] =
    React.useMemo(
      () =>
        ((externalProps = {} as any) => {
          const isExactItme =
            variant === "item" &&
            itemChildren &&
            expansionMode === "popper" &&
            expandable;

          return mergeProps([
            {
              variant,
              type,
              loading: isLoading,
              rootComponent: slots?.[variant],
              disableRipple: variant === "header",
              target: external && variant === "item" ? "_blank" : undefined,
              href: href || undefined,
              component: Component as React.ElementType,
              onClick: (e: React.MouseEvent<any, MouseEvent>) => {
                if (selectable) instance.setItemSelection(itemId);

                if (
                  itemChildren &&
                  expandable &&
                  (expansionMode === "collapse" || variant === "header")
                )
                  instance.setItemExpansion(itemId, {
                    anchorEl: e.currentTarget,
                  });

                if (expansionMode === "popper" && type === "sub" && href)
                  instance.setItemExpansion(parentId as string, {
                    in: false,
                  });
              },
              onMouseEnter: (e: React.MouseEvent<any, MouseEvent>) => {
                if (isExactItme)
                  instance.setItemExpansion(itemId, {
                    anchorEl: e.currentTarget,
                    in: true,
                  });
              },
              onMouseLeave: (e: React.MouseEvent<any, MouseEvent>) => {
                if (isExactItme)
                  instance.setItemExpansion(itemId, {
                    in: false,
                  });
              },
              className: itemClasses,
              sx: combineSxProps(
                itemTheme[variant],
                type === "sub" && variant === "item" ? itemTheme?.subItem : {}
              ),
            },
            slotProps?.[variant],
            externalProps as object,
          ]);
        }) as UseNavItemReturnValue["getItemContainerProps"],
      [
        hideSubHeader,
        expandable,
        expansionMode,
        selectable,
        variant,
        isLoading,
        external,
        href,
        type,
        Component,
        caption,
        itemTheme?.subHeight,
        itemId,
        itemClasses,
        itemChildren,
        slotProps?.[variant],
        slots?.[variant],
      ]
    );

  /**
   * getItemIconProps
   */
  const getItemIconProps: UseNavItemReturnValue["getItemIconProps"] =
    React.useMemo(
      () =>
        ((iconType: "start" | "end", externalProps = {} as any) => {
          const type = `${iconType}Icon` as "startIcon" | "endIcon";

          return mergeProps([
            {
              children: item?.[type] ?? null,
              rootComponent: slots?.[type],
              disableIconOnDesktop: DisableIconOnDesktop,
              disableIconOnMobile: DisableIconOnMobile,
              className: navItemClasses[type],
            },
            slotProps?.[type],
            externalProps,
          ]);
        }) as UseNavItemReturnValue["getItemIconProps"],
      [
        DisableIconOnDesktop,
        DisableIconOnMobile,
        slotProps?.startIcon,
        slotProps?.endIcon,
        startIcon,
        endIcon,
      ]
    );

  /**
   * getItemCaptionProps
   */
  const getItemCaptionProps: UseNavItemReturnValue["getItemCaptionProps"] =
    React.useMemo(
      () =>
        ((externalProps = {} as any) => {
          return mergeProps([
            {
              disableCaptionTooltip: DisableCaptionTooltip,
              rootComponent: slots?.caption,
              sx: itemTheme?.caption,
            },
            slotProps?.caption,
            externalProps,
          ]);
        }) as UseNavItemReturnValue["getItemCaptionProps"],
      [slots?.caption, slotProps?.caption, DisableCaptionTooltip]
    );

  /**
   * getCollapseIconProps
   */
  const getCollapseIconProps: UseNavItemReturnValue["getCollapseIconProps"] =
    React.useMemo(
      () =>
        ((externalProps = {} as any) => {
          return mergeProps([
            {
              rootComponent: slots?.collapseIcon,
              expanded:
                expansionMode === "collapse" || variant === "header"
                  ? getExpanded?.in
                  : type === "root" &&
                    expansionMode === "popper" &&
                    orientation === "horizontal",
              expandable,
            },
            slotProps?.collapseIcon,
            externalProps,
          ]);
        }) as UseNavItemReturnValue["getCollapseIconProps"],
      [
        getExpanded?.in,
        expansionMode,
        slots?.collapseIcon,
        slotProps?.collapseIcon,
        type,
        orientation,
        expandable,
      ]
    );

  /**
   * getTransitionGroupProps
   */
  const getTransitionGroupProps: UseNavItemReturnValue["getTransitionGroupProps"] =
    React.useMemo(
      () =>
        (<Group extends NavItemTransitionGroupType>(
          groupType = (variant === "header" ? "collapse" : expansionMode) as
            | Group
            | undefined,
          externalProps = {} as any
        ) => {
          return mergeProps(
            [
              {
                "aria-multiselectable": selectionMode === "multiple",
                transitionGroupType: groupType,
                variant,
                children: itemChildren?.map((item, i) => (
                  <NavItem itemId={item.id} key={i} />
                )),
                className: navItemClasses.root__ul,
                slotProps: {
                  root: {
                    unmountOnExit: variant === "item",
                    role: "group",
                    ...(groupType === "popper"
                      ? {
                          open: getExpanded?.in,
                          anchorEl: getExpanded?.anchorEl,
                          placement:
                            type === "root" && orientation === "horizontal"
                              ? "bottom-start"
                              : "right",
                        }
                      : {
                          in: getExpanded?.in,
                        }),

                    ...(groupType === "popper"
                      ? {
                          onMouseEnter: () => {
                            if (itemChildren && expandable)
                              instance.setItemExpansion(itemId, {
                                anchorEl: getExpanded.anchorEl,
                                in: true,
                              });
                          },
                          onMouseLeave: () => {
                            if (expandable)
                              instance.setItemExpansion(itemId, { in: false });
                          },
                        }
                      : {}),
                    className: mergeClasses([
                      navItemClasses.transitionGroup,
                      variant === "header"
                        ? navItemClasses.headerTransitionGroup
                        : navItemClasses.itemsTransitionGroup,
                    ]),
                  },
                },
                sx: itemTheme.subBeforeLine
                  ? (theme: Theme) =>
                      ({
                        "&::before": resolveSelector(
                          itemTheme.subBeforeLine,
                          theme
                        ),
                      }) as SxProps
                  : {},
              },
              slotProps?.transitionGroup,
              externalProps,
            ],
            { forwardSlotPropsAsFunction: true }
          );
        }) as UseNavItemReturnValue["getTransitionGroupProps"],
      [
        selectionMode,
        expandable,
        expansionMode,
        slotProps?.transitionGroup,
        variant,
        getExpanded,
        orientation,
        itemChildren,
        itemId,
        type,
      ]
    );

  // navContextProps -----------------------------------------------------------

  const navItemContextValue: UseNavItemReturnValue = React.useMemo(
    () => ({
      item: {
        ...item,
        variant,
        type,
        external: external,
        slots,
        slotProps,
        component: Component as React.ElementType,
        disableIconOnDesktop: DisableIconOnDesktop as boolean,
        disableIconOnMobile: DisableIconOnMobile as boolean,
        disableCaptionTooltip: DisableCaptionTooltip as boolean,
      } as UseNavItemReturnValue["item"],
      status,
      publicAPI,
      instance,
      getRootProps,
      getItemContainerProps,
      getItemIconProps,
      getItemCaptionProps,
      getCollapseIconProps,
      getTransitionGroupProps,
    }),
    [
      item,
      Component,
      DisableIconOnDesktop,
      DisableIconOnMobile,
      DisableCaptionTooltip,
      status,
      getRootProps,
      getItemContainerProps,
      getItemIconProps,
      getItemCaptionProps,
      getCollapseIconProps,
      getTransitionGroupProps,
    ]
  );

  return (
    <NavItemContext.Provider value={navItemContextValue}>
      {NavigationBarSlots?.item ? (
        <NavigationBarSlots.item itemId={itemId} />
      ) : (
        <NavTreeItem itemId={itemId} />
      )}
    </NavItemContext.Provider>
  );
};

export interface NavItemProps {
  /**
   * The id of the item.
   * Must be unique.
   */
  itemId: NavItemDef["id"];
}

export default NavItem;
