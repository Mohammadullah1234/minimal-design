"use client";

import * as React from "react";
import ScrollBar, {
  ScrollBarProps,
  ScrollBarTheme,
} from "@/UI/material/ScrollBar";
import mergeClasses from "@/UI/utils/mergeClasses";
import { styled, Theme } from "@/UI/styles/MuiStyles";
import { navItemClasses } from "../components/NavItem";
import { navTransitionGroupULStyles } from "@/UI/material/styles/customizations";
import { NavigationBarOwnProps, NavItemDef } from "../types";
import NavigationTreeViewContext from "../contexts/NavigationTreeViewContext";
import { useNavigationBar } from "../hooks/useNavigationBar";
import { useNavigationTreeView } from "../internal-hooks/useNavigationTreeView";
import { NAVIGATION_TREE_VIEW_PLUGINS } from "./NavigationTreeView.plugins";
import { selectorNavItemsJSX } from "../plugins/useNavItems";
import { NavigationTreeViewState } from "./store";
import { CreateSlotsAndSlotProps, memoTheme, SlotProps } from "../../utils";
import useSelector from "@/UI/hooks/useSelector";
import useSlotAndSlotProps from "@/UI/hooks/useSlotAndSlotProps";
import {
  navigationTreeViewFooterSectionStyles,
  navigationTreeViewNavStyles,
} from "../../styles/customizations/NavigationBar";
import resolveSelector from "@/UI/utils/resolveSelector";

const NavigationNav = styled("nav", {
  shouldForwardProp: (prop: string) =>
    !["density", "orientation", "hideSubHeader"].includes(prop),
})<Pick<NavigationBarOwnProps, "density" | "orientation" | "hideSubHeader">>(
  memoTheme(() => navigationTreeViewNavStyles() as TemplateStringsArray)
);

const TransitionGroupUL = styled("ul")(
  () => navTransitionGroupULStyles() as TemplateStringsArray
);

const FooterSectionStyled = styled("div")(
  memoTheme(
    () => navigationTreeViewFooterSectionStyles() as TemplateStringsArray
  )
);

const NavigationTreeView: NavigationBarTreeViewComponent = React.forwardRef(
  (inProps, ref) => {
    const {
      items,
      selectionMode = "single",
      expansionMode,
      disableAutoExpandActiveItems = false,
      disableAutoUnExpandUnActiveItems = false,
      slots,
      slotProps: SlotProps,
      ...props
    } = inProps;

    const ownerState = React.useMemo(
      () => ({
        items,
        selectionMode,
        expansionMode,
        disableAutoExpandActiveItems,
        disableAutoUnExpandUnActiveItems,
      }),
      [
        items,
        selectionMode,
        expansionMode,
        disableAutoExpandActiveItems,
        disableAutoUnExpandUnActiveItems,
      ]
    );
    const slotProps = React.useMemo(
      () => resolveSelector(SlotProps, ownerState),
      [SlotProps, ownerState]
    );

    const {
      density,
      orientation,
      hideSubHeader,
      footerSection,
      slots: NavSlots,
      slotProps: NavSlotProps,
      classes,
    } = useNavigationBar();

    const resolvedItems = resolveSelector(items);
    const contextValue = useNavigationTreeView({
      items: resolvedItems,
      plugins: NAVIGATION_TREE_VIEW_PLUGINS,
    });

    const renderNavItems = useSelector(contextValue.store, selectorNavItemsJSX);

    React.useEffect(() => {
      const instance = contextValue.instance;

      instance.setSelectionMode(selectionMode);
      instance.setExpansionMode(
        expansionMode ??
          (orientation === "horizontal"
            ? "popper"
            : density === "compact"
              ? "popper"
              : "collapse")
      );
    }, [selectionMode, expansionMode, orientation, density]);

    const [FooterSection, footerSectionProps] = useSlotAndSlotProps(
      {
        slot: NavSlots?.footerSection,
        slotProps: NavSlotProps?.footerSection,
        elementType: FooterSectionStyled,
        defaultProps: {
          className: mergeClasses([classes.section, classes.footerSection]),
          sx: { padding: "1rem" },
        },
      },
      [NavSlotProps?.footerSection, classes.section, classes.footerSection]
    );

    const renderFooterSection = React.useMemo(
      () =>
        footerSection && (
          <FooterSection {...footerSectionProps}>{footerSection}</FooterSection>
        ),
      [footerSection, FooterSection, footerSectionProps]
    );

    /**
     * TreeView Slots and SlotProps
     */
    const scrollBarThemeProps = React.useCallback(
      ((theme) => {
        const scrollBarTheme = (theme: Theme) =>
          resolveSelector(slotProps?.root?.scrollBarTheme, theme);

        return {
          ...scrollBarTheme(theme),
          content: {
            ...(orientation === "horizontal"
              ? {
                  display: "flex",
                  flexDirection: "row",
                }
              : {}),
            ...scrollBarTheme(theme)?.content,
          },
          trackVertical: {
            ...(density === "compact" && {
              opacity: 0,
            }),
            ...scrollBarTheme(theme)?.trackVertical,
          },
        };
      }) as (theme: Theme) => ScrollBarTheme,
      [orientation, density, slotProps?.root?.scrollBarTheme]
    );

    const [NavigationTreeViewRoot, navigationTreeViewRootProps] =
      useSlotAndSlotProps(
        {
          slot: slots?.root,
          slotProps: slotProps?.root,
          elementType: ScrollBar,
          defaultProps: {
            sx: {
              width: "100%",
              overflow: "auto",
            },
            className: classes.treeView,
            scrollBarTheme: scrollBarThemeProps,
          },
        },
        [slotProps?.root, classes.treeView, scrollBarThemeProps]
      );

    const [NavigationTreeViewNav, navigationTreeViewNavProps] =
      useSlotAndSlotProps(
        {
          slot: slots?.nav,
          slotProps: slotProps?.nav,
          elementType: NavigationNav,
          defaultProps: {
            className: classes.navItemsContainer,
            orientation: orientation,
            density: density,
            hideSubHeader: hideSubHeader,
          },
        },
        [
          slotProps?.nav,
          classes.navItemsContainer,
          orientation,
          density,
          hideSubHeader,
        ]
      );

    /**
     * Content value
     */
    const navigationTreeViewContextValue = React.useMemo(
      () => ({
        ...contextValue,
        items,
        selectionMode,
        expansionMode,
        disableAutoExpandActiveItems,
        disableAutoUnExpandUnActiveItems,
      }),
      [
        contextValue,
        items,
        selectionMode,
        expansionMode,
        disableAutoExpandActiveItems,
        disableAutoUnExpandUnActiveItems,
      ]
    );

    return (
      <NavigationTreeViewRoot {...navigationTreeViewRootProps}>
        <NavigationTreeViewContext.Provider
          value={navigationTreeViewContextValue}
        >
          <NavigationTreeViewNav {...navigationTreeViewNavProps}>
            <TransitionGroupUL
              {...props}
              className={mergeClasses([
                navItemClasses.root__ul,
                props?.className,
              ])}
              ref={ref}
            >
              {renderNavItems}
            </TransitionGroupUL>
          </NavigationTreeViewNav>

          {renderFooterSection}
        </NavigationTreeViewContext.Provider>
      </NavigationTreeViewRoot>
    );
  }
) as NavigationBarTreeViewComponent;

type ItemsProps<OtherItemDef extends object = {}> =
  () => readonly NavItemDef<OtherItemDef>[];

export interface NavigationTreeViewSlots {
  /**
   * The component that renders the `root` slot.
   * @default ScrollBar
   */
  root: React.ElementType;
  /**
   * The component that renders the `nav` slot.
   * @default "nav"
   */
  nav: React.ElementType;
}

export interface NavigationTreeViewSlotProps {
  /**
   * Props forwarded to the `root` component. By default, the avaible props are based on the `root` component.
   */
  root: ScrollBarProps;
  /**
   * Props forwarded to the `nav` component. By default, the avaible props are based on the `nav` component.
   */
  nav: SlotProps<"nav">;
}

export type NavigationTreeViewSlotsAndSlotProps = CreateSlotsAndSlotProps<
  NavigationTreeViewSlots,
  NavigationTreeViewSlotProps,
  NavigationTreeViewOwnerState
>;

export interface NavigationTreeViewOwnerState<
  OtherItemDef extends object = {},
> {
  /**
   * Defines the menu items of the `NavigationBar`.
   * items prop can be either array or function.
   */
  items:
    | readonly NavItemDef<OtherItemDef>[]
    | ItemsProps<NavItemDef<OtherItemDef>>;

  /**
   * Defines the mode of selection.
   * @default "single"
   */
  selectionMode?: NavigationTreeViewState["selection"]["mode"];
  /**
   * Defines the mode of expansion.
   * @default "collapse"
   */
  expansionMode?: NavigationTreeViewState["expansion"]["mode"];
  /**
   * If it's true, the active items auto expantion will be disabled, when changing pathname.
   */
  disableAutoExpandActiveItems?: boolean;
  /**
   * If it's true, the active items auto close expantion will be disabled on un active items, when changing pathname.
   */
  disableAutoUnExpandUnActiveItems?: boolean;
  /**
   * The component that renders the base slot.
   * @default "ul"
   */
  baseComponent?: React.ElementType;
}

export interface NavigationTreeViewOwnProps<OtherItemDef extends object = {}>
  extends NavigationTreeViewOwnerState<OtherItemDef>,
    NavigationTreeViewSlotsAndSlotProps {}

export interface NavigationTreeViewProps<OtherItemDef extends object = {}>
  extends NavigationTreeViewOwnProps<OtherItemDef>,
    SlotProps<"ul"> {}

interface NavigationBarTreeViewComponent {
  <OtherItemDef extends object = {}>(
    props: NavigationTreeViewProps<OtherItemDef>
  ): React.JSX.Element;
  propTypes: any;
}

export default NavigationTreeView;
