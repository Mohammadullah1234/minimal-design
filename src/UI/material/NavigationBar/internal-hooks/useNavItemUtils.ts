import * as React from "react";
import {
  NavigationBarOwnProps,
  NavigationBarSlotProps,
  NavItemDef,
  NavItemDefPublicModelProperties,
  NavItemDefSlotsAndSlotProps,
  NavItemDefStatus,
} from "../types";
import isActiveLink from "@/UI/utils/activeLink";
import { isExternalLink } from "@/UI/utils/url";
import { UseNavigationTreeViewPropsReturnValue } from "../hooks";
import {
  NavigationTreeViewState,
  NavigationTreeViewStateExpantionValue,
} from "../NavigationTreeView/store";
import resolveSelector from "@/UI/utils/resolveSelector";

export const useNavItemUtils = <OtherItemDef extends object>({
  itemId,
  item,
  itemDef,
  usePathname,
  publicAPI,
  instance,
  disableAutoExpandActiveItems,
  disableAutoUnExpandUnActiveItems,
}: UseNavItemUtilsParameters<OtherItemDef>): UseNavItemUtilsReturnValue => {
  const pathName = usePathname();

  const {
    id,
    variant = "item",
    type = "root",
    expanded,
    selected,
    active,
    loading,
    href,
    disabled,
    children: itemChildren,
    component,
    external,
    disableIconOnDesktop,
    disableIconOnMobile,
    disableCaptionTooltip,
    disableSelection,
    disableExpansion,
  } = item;

  const getSelected = publicAPI.getSelected(id);
  const selectable = publicAPI.getSelectable(id);
  const selectionMode = publicAPI.getSelectionMode();

  const getExpanded = publicAPI.getExpanded(id);
  const expandable = publicAPI.getExpandable(id);
  const expansionMode = publicAPI.getExpansionMode();

  const activeItem = React.useMemo(() => {
    return href ? isActiveLink(pathName, href) : false;
  }, [href, pathName]);

  const selectedItem = React.useMemo(
    () => getSelected && !itemChildren && selectable,
    [getSelected, itemChildren, selectable]
  );

  const expandedItem = React.useMemo(
    () => Boolean(getExpanded?.in && itemChildren && expandable),
    [getExpanded?.in, itemChildren, expandable]
  );

  const isLink = React.useMemo(
    () => ((component === "a" || href) && !itemChildren ? true : false),
    [component, href, itemChildren]
  );

  const externalItem = React.useMemo(
    () => isExternalLink(href as string),
    [href]
  );
  // item method props and variables -------------------------------------

  const status: NavItemDefStatus = {
    isActive: activeItem as boolean,
    isSelected: (selectedItem && !activeItem) as boolean,
    isExpanded: expandedItem as boolean,
    isLink,
    isExternalLink: externalItem,
    isDisabled: disabled as boolean,
    isLoading: loading as boolean,
  };
  const navItemDef = resolveSelector(
    itemDef,
    { ...{ variant, type, external }, ...item },
    status
  );

  const { slotProps, slots } = (navItemDef ?? {
    slotProps: undefined,
    slots: undefined,
  }) as Pick<UseNavItemUtilsReturnValue, "slots" | "slotProps">;

  // render main status ---------------------------------------------------------

  React.useEffect(() => {
    instance.setItemActive(id, active ?? navItemDef?.active ?? status.isActive);
  }, [active, navItemDef?.active, status.isActive]);

  React.useEffect(() => {
    if (selected || navItemDef?.selected)
      instance.setItemSelection(id, selected ?? navItemDef?.selected);
  }, [selected, navItemDef?.selected]);

  React.useEffect(() => {
    if (expanded || navItemDef?.expanded)
      instance.setItemExpansion(itemId, {
        in: expanded ?? navItemDef?.expanded,
      });
  }, [expanded, navItemDef?.expanded]);

  React.useEffect(() => {
    if (status.isDisabled || navItemDef?.disabled)
      instance.setItemDisabled(
        id,
        Boolean(status.isDisabled ?? navItemDef?.disabled)
      );
  }, [status.isDisabled, navItemDef?.disabled]);

  React.useEffect(() => {
    if (status.isLoading || navItemDef?.loading) {
      const loading = status.isLoading ?? navItemDef?.loading;

      instance.setItemLoading(id, Boolean(loading));
      instance.setItemDisabled(id, Boolean(loading));
    }
  }, [status.isLoading, navItemDef?.loading]);

  React.useEffect(() => {
    const getSelection = disableSelection ?? navItemDef?.disableSelection;
    instance.setSelectionEnabled(id, !getSelection);
  }, [disableSelection, navItemDef?.disableSelection]);

  React.useEffect(() => {
    const getExpanstion = disableExpansion ?? navItemDef?.disableExpansion;
    instance.setExpansionEnabled(id, !getExpanstion);
  }, [disableExpansion, navItemDef?.disableExpansion]);

  const isActive = publicAPI.getActive(id);
  const isSelected = status.isSelected;
  const isExpanded = status.isExpanded;
  const isDisabled = publicAPI.getDisabled(id);
  const isLoading = publicAPI.getLoading(id);

  const Component =
    (component ? component : navItemDef?.component) ??
    (isLink && variant === "item" ? "a" : "div");

  const DisableCaptionTooltip = React.useMemo(
    () => disableCaptionTooltip ?? navItemDef?.disableCaptionTooltip,
    [disableCaptionTooltip ?? navItemDef?.disableCaptionTooltip]
  );
  const DisableIconOnDesktop = React.useMemo(
    () => disableIconOnDesktop ?? navItemDef?.disableIconOnDesktop,
    [disableIconOnDesktop ?? navItemDef?.disableIconOnDesktop]
  );
  const DisableIconOnMobile = React.useMemo(
    () => disableIconOnMobile ?? navItemDef?.disableIconOnMobile,
    [disableIconOnMobile ?? navItemDef?.disableIconOnMobile]
  );

  /**
   * toggle expand on active item, on expansionMode or active item change
   */
  React.useEffect(() => {
    if (variant === "item" && type === "root" && isActive && itemChildren)
      instance.setItemExpansion(itemId, {
        in:
          expansionMode === "collapse" ? !disableAutoExpandActiveItems : false,
      });
  }, [expansionMode, isActive, disableAutoExpandActiveItems]);

  /**
   * auto unExpand unActive items
   */
  React.useEffect(() => {
    if (
      variant === "item" &&
      type === "root" &&
      getExpanded?.in &&
      itemChildren &&
      !disableAutoUnExpandUnActiveItems
    )
      instance.setItemExpansion(itemId, { in: false });
  }, [
    ...(variant === "item" && itemChildren && type === "root"
      ? [pathName, disableAutoUnExpandUnActiveItems]
      : []),
  ]);

  const mainStatus = {
    isActive,
    isSelected,
    isExpanded,
    isLink,
    isDisabled,
    isLoading,
    isExternalLink: status.isExternalLink,
  };

  return {
    status: mainStatus,
    slotProps,
    slots,
    component: Component,
    disableIconOnDesktop: DisableIconOnDesktop as boolean,
    disableIconOnMobile: DisableIconOnMobile as boolean,
    disableCaptionTooltip: DisableCaptionTooltip as boolean,
    getExpanded,
    selectable,
    expandable,
    expansionMode,
    selectionMode,
  };
};

export interface UseNavItemUtilsParameters<OtherItemDef extends object = {}>
  extends UseNavigationTreeViewPropsReturnValue<OtherItemDef>,
    Pick<NavigationBarOwnProps<OtherItemDef>, "usePathname">,
    Pick<NavigationBarSlotProps<OtherItemDef>, "itemDef"> {
  itemId: NavItemDef["id"];
  item: Required<NavItemDef<OtherItemDef>>;
}

export type UseNavItemUtilsReturnValue = Required<
  Pick<
    Required<NavItemDefPublicModelProperties>,
    | "component"
    | "disableIconOnDesktop"
    | "disableIconOnMobile"
    | "disableCaptionTooltip"
  >
> &
  NavItemDefSlotsAndSlotProps & {
    status: NavItemDefStatus;
    getExpanded: NavigationTreeViewStateExpantionValue;
    selectable: boolean;
    expandable: boolean;
    expansionMode: NavigationTreeViewState["expansion"]["mode"];
    selectionMode: NavigationTreeViewState["selection"]["mode"];
  };
