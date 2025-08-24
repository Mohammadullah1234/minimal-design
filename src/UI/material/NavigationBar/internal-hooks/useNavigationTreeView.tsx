"use client";

import * as React from "react";
import NavigationTreeViewStore, {
  NavigationTreeViewState,
} from "../NavigationTreeView/store";
import { NavItemDef } from "../types";
import {
  UseNavItemSelectionInstance,
  UseNavItemSelectionPublicAPI,
} from "../plugins/useNavItemSelection";
import { NavItem } from "../components";
import {
  mergeHrefsItemsWithParentId,
  processNavItemsLookups,
} from "../plugins/useNavItems/useNavItems.utils";
import {
  UseNavItemsInstance,
  UseNavItemsPublicAPI,
} from "../plugins/useNavItems";
import {
  UseNavItemExpansionInstance,
  UseNavItemExpansionPublicAPI,
} from "../plugins/useNavItemExpansion";
import {
  UseNavItemActiveInstance,
  UseNavItemActivePublicAPI,
} from "../plugins/useNavItemActive";
import {
  UseNavItemDisabledInstance,
  UseNavItemDisabledPublicAPI,
} from "../plugins/useNavItemDisabled";
import {
  UseNavItemLoadingInstance,
  UseNavItemLoadingPublicAPI,
} from "../plugins/useNavItemLoading";

let globalId = 0;

/**
 * This main hook that sets the store, plugin system and items for navigation tree-view.
 *
 * @param plugins All the plugins that will be used in the navigation tree-view.
 * @param items The items passed to the tree-view.
 * @returns `store`, `publicAPI` and `instance`(s).
 */
export const useNavigationTreeView = <
  OtherItemDef extends object,
  Plugins extends Array<any>,
>({
  items,
  plugins,
}: UseNavigationTreeViewParamiters<
  OtherItemDef,
  Plugins
>): UseNavigationTreeViewReturnValue<OtherItemDef> => {
  type ItemDef = OtherItemDef;

  const instanceRef = React.useRef<
    UseNavigationTreeViewReturnValue<ItemDef>["instance"] | null
  >(null);
  const publicAPIRef =
    React.useRef<UseNavigationTreeViewReturnValue<ItemDef>["publicAPI"]>(null);
  const storeRef = React.useRef<NavigationTreeViewStore<ItemDef>>(null);

  if (storeRef.current === null) {
    globalId += 1;
    const initialState: NavigationTreeViewState<ItemDef> = {
      items: {},
      selection: {
        selected: {},
        mode: "single",
        enabled: {},
      },
      expansion: {
        expanded: {},
        mode: "collapse",
        enabled: {},
      },
      active: {},
      disabled: {},
      loading: {},
      cacheKey: {
        id: globalId,
      },
    };
    storeRef.current = new NavigationTreeViewStore<ItemDef>(initialState);
  }

  if (!storeRef.current.state.items.itemsDefaultLookup) {
    const mergedHrefsItems = mergeHrefsItemsWithParentId(items);
    const lookupedItems = processNavItemsLookups({ items: mergedHrefsItems });

    storeRef.current.update((prevState) => ({
      ...prevState,
      items: {
        itemsDefaultLookup: items,
        itemsLookup: mergedHrefsItems,
        itemsJSXLookup: mergedHrefsItems.map((item, i) => (
          <NavItem itemId={item.id} key={i} />
        )),
        ...lookupedItems,
      },
    }));
  }

  if (instanceRef.current === null || publicAPIRef.current === null)
    plugins.forEach((runPlugin) => {
      const plugin = runPlugin(storeRef.current);

      instanceRef.current = { ...instanceRef.current, ...plugin.instance };
      publicAPIRef.current = {
        ...publicAPIRef.current,
        ...plugin.publicAPI,
      };
    });

  const store = storeRef.current;
  const publicAPI = publicAPIRef.current;
  const instance = instanceRef.current;

  return React.useMemo(
    () => ({
      store,
      publicAPI,
      instance,
    }),
    [items]
  ) as UseNavigationTreeViewReturnValue<ItemDef>;
};

export interface UseNavigationTreeViewParamiters<
  OtherItemDef extends object,
  Plugins extends Array<any>,
> {
  plugins: Plugins;
  items: readonly NavItemDef<OtherItemDef>[];
}

interface PublicAPI<OtherItemDef extends object>
  extends UseNavItemsPublicAPI<OtherItemDef>,
    UseNavItemExpansionPublicAPI<OtherItemDef>,
    UseNavItemSelectionPublicAPI<OtherItemDef>,
    UseNavItemActivePublicAPI<OtherItemDef>,
    UseNavItemDisabledPublicAPI<OtherItemDef>,
    UseNavItemLoadingPublicAPI<OtherItemDef> {}

interface Instance<OtherItemDef extends object>
  extends UseNavItemsInstance<OtherItemDef>,
    UseNavItemExpansionInstance<OtherItemDef>,
    UseNavItemSelectionInstance<OtherItemDef>,
    UseNavItemActiveInstance<OtherItemDef>,
    UseNavItemDisabledInstance<OtherItemDef>,
    UseNavItemLoadingInstance<OtherItemDef> {}

export interface UseNavigationTreeViewReturnValue<
  OtherItemDef extends object = {},
> {
  /**
   * The store of NavigationTreeView.
   */
  store: NavigationTreeViewStore<OtherItemDef>;
  /**
   * The publicAPI use to check the status of item.
   */
  publicAPI: PublicAPI<OtherItemDef>;
  /**
   * The instance use to perform operations on item.
   */
  instance: Instance<OtherItemDef>;
}
