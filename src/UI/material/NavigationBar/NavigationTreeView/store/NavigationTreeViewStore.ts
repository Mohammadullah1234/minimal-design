import { PopperProps } from "@mui/material/Popper";
import { NavItemDef } from "../../types";

type Listener<T> = (value: T) => void;

export type NavigationTreeViewStateCacheKey = {
  id: number;
};
export type NavigationTreeViewStateExpantionValue = {
  in: boolean;
  anchorEl: PopperProps["anchorEl"];
};

export interface NavigationTreeViewState<OtherItemDef extends object = {}> {
  items: {
    itemsDefaultLookup?: readonly NavItemDef<OtherItemDef>[];
    itemsLookup?: readonly NavItemDef<OtherItemDef>[];
    itemsJSXLookup?: React.JSX.Element[];
    itemModelLookup?: Record<string, NavItemDef<OtherItemDef>>;
    itemOrderedChildrenIdsLookup?: Record<string, NavItemDef["id"][]>;
    itemChildrenIndexesLookup?: Record<
      string,
      Record<NavItemDef<OtherItemDef>["id"], number>
    >;
  };
  selection: {
    selected: Record<string, boolean>;
    mode: "single" | "multiple";
    enabled: Record<string, boolean>;
  };
  expansion: {
    expanded: Record<string, NavigationTreeViewStateExpantionValue>;
    mode: "collapse" | "popper";
    enabled: Record<string, boolean>;
  };
  active: Record<string, boolean>;
  disabled: Record<string, boolean>;
  loading: Record<string, boolean>;
  cacheKey: NavigationTreeViewStateCacheKey;
}

export type NavigationTreeViewStoreUpdater<OtherItemDef extends object = {}> = (
  prevState: NavigationTreeViewState<OtherItemDef>
) => NavigationTreeViewState<OtherItemDef>;

export default class NavigationTreeViewStore<OtherItemDef extends object = {}> {
  state: NavigationTreeViewState<OtherItemDef>;
  private listeners;
  subscribe: (
    fn: Listener<NavigationTreeViewState<OtherItemDef>>
  ) => () => void;
  getSnapshot: () => NavigationTreeViewState<OtherItemDef>;
  update: (
    updater: NavigationTreeViewStoreUpdater<NavItemDef<OtherItemDef>>
  ) => void;

  constructor(state: NavigationTreeViewState<OtherItemDef>) {
    this.state = void 0 as unknown as NavigationTreeViewState<
      NavItemDef<OtherItemDef>
    >;
    this.listeners = new Set();
    this.subscribe = (fn) => {
      this.listeners.add(fn);
      return () => {
        this.listeners.delete(fn);
      };
    };
    this.getSnapshot = () => {
      return this.state;
    };
    this.update = (updater) => {
      const newState = updater(this.state);
      if (newState !== this.state) {
        this.state = newState;
        this.listeners.forEach((l) =>
          (l as (state: NavigationTreeViewState<OtherItemDef>) => void)(
            newState
          )
        );
      }
    };
    this.state = state;
    this.listeners = new Set();
  }
}
