"use client";

import * as React from "react";
import {
  navigationBarRootStyles,
  navigationBarRootHorizontalContainerStyles,
  navigationBarLayoutStyles,
  navigationBarMainStyles,
  navigationBarMainContainerStyles,
  navigationBarSwipeableDrawerStyles,
  navigationBarRootNavStyles,
  navigationBarHeaderSectionStyles,
  navigatonBarToggleDensityButtonStyles,
} from "../styles/customizations/NavigationBar";
import Container from "@mui/material/Container";
import { NavigationBarOwnProps, NavigationBarProps } from "./types";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {
  getNavigationBarUtilityClass,
  NavigationBarClasses,
  NavigationBarClassKey,
} from "./navigationBarClasses";
import NavigationBarContext from "./contexts/NavigationBarContext";
import composeClasses from "@/UI/utils/composeClasses";
import mergeClasses from "@/UI/utils/mergeClasses";
import useMediaQuery from "@/UI/hooks/useMediaQuery";
import { useMuiTheme } from "@/UI/styles/hooks";
import NavigationTreeView, {
  NavigationTreeViewProps,
} from "./NavigationTreeView";
import {
  initialNavigationBarHeight,
  initialNavigationBarItemThemeProps,
  initialNavigationBarLocalStorageKeys,
  initialNavigationBarWidth,
} from "./initialProps";
import {
  UseNavigationBarInstancesReturnValue,
  UseNavigationBarReturnValue,
} from "./hooks";
import capitalize from "@/UI/utils/capitalize";
import IconButton from "../IconButton";
import { styled } from "@/UI/styles/MuiStyles";
import { memoTheme } from "../utils";
import { setStorage } from "@/UI/utils/localStorage";
import useSlotAndSlotProps from "@/UI/hooks/useSlotAndSlotProps";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@/UI/icons/minimal";
import resolveSelector from "@/UI/utils/resolveSelector";
import { NavigationBarInstances } from "./contexts";
import { shouldForwardProp } from "../styles";

const NavigationBarRootStyled = styled("div", {
  shouldForwardProp: (prop) => shouldForwardProp(prop),
})(
  memoTheme(
    ({ theme }) => navigationBarRootStyles(theme) as TemplateStringsArray
  )
);

const RootHorizontalContainerStyled = styled("div", {
  shouldForwardProp: (prop) => shouldForwardProp(prop),
})(
  memoTheme(
    () => navigationBarRootHorizontalContainerStyles() as TemplateStringsArray
  )
);

const RootNavStyled = styled("div", {
  shouldForwardProp: (prop: string) =>
    !["width", "hideSubHeader"].includes(prop) && shouldForwardProp(prop),
})<
  Pick<
    Required<NavigationBarProps>,
    "orientation" | "density" | "hideSubHeader"
  > & { width: number; height: number }
>(
  ({ theme, width, height, orientation, density, hideSubHeader }) =>
    navigationBarRootNavStyles(
      theme,
      width,
      height,
      orientation,
      density,
      hideSubHeader
    ) as TemplateStringsArray
);

const LayoutStyled = styled("div", {
  shouldForwardProp: (prop: string) =>
    !["width", "orientation"].includes(prop) && shouldForwardProp(prop),
})<{ width: number } & Pick<NavigationBarOwnProps, "orientation">>(
  ({ theme, width, orientation }) =>
    navigationBarLayoutStyles(theme, orientation, width) as TemplateStringsArray
);

const MainStyled = styled("main", {
  shouldForwardProp: (prop) => shouldForwardProp(prop),
})(memoTheme(() => navigationBarMainStyles() as TemplateStringsArray));

const MainContainerStyled = styled(Container)(
  memoTheme(
    ({ theme }) =>
      navigationBarMainContainerStyles(theme) as TemplateStringsArray
  )
);

const HeaderSectionStyled = styled("div", {
  shouldForwardProp: (prop: string) => shouldForwardProp(prop),
})<Pick<NavigationBarProps, "density">>(
  memoTheme(({ theme }) => ({
    ...(navigationBarHeaderSectionStyles(theme) as TemplateStringsArray),
    variants: [
      {
        props: {
          density: "compact",
        },
        style: {
          justifyContent: "center",
        },
      },
    ],
  }))
);

const ToggleDensityButtonStyled = styled(IconButton)(
  memoTheme(
    ({ theme }) =>
      navigatonBarToggleDensityButtonStyles(theme) as TemplateStringsArray
  )
);

const SwipeableDrawerStyled = styled(SwipeableDrawer)(
  memoTheme(
    ({ theme }) =>
      navigationBarSwipeableDrawerStyles(theme) as TemplateStringsArray
  )
);

/**
 * The NavigationBar utility classes
 */
const useUtilityClasses = ({
  classes,
  orientation,
  density,
}: {
  classes: Partial<NavigationBarClasses> | undefined;
} & Pick<NavigationBarOwnProps, "orientation" | "density">) => {
  const slots = {
    root: ["root"],
    rootHorizontalContainer: ["rootHorizontalContainer"],
    rootNav: [
      "rootNav",
      `orientation${capitalize(orientation as string)}`,
      `density${capitalize(density as string)}`,
    ],
    layout: ["layout"],
    main: ["main"],
    mainContainer: ["mainContainer"],
    navItemsContainer: ["navItemsContainer"],
    container: ["container"],
    treeView: ["treeView"],
    section: ["section"],
    headerSection: ["headerSection"],
    footerSection: ["footerSection"],
    swipeableDrawer: ["swipeableDrawer"],
    toggleDensityButton: ["toggleDensityButton"],
  };

  return composeClasses<NavigationBarClassKey>(
    slots,
    getNavigationBarUtilityClass,
    classes
  );
};

/**
 * The NavigationBar component.
 */
const NavigationBar: NavigationBarComponent = ({
  open,
  onOpen,
  onClose,
  headerContainer: HeaderContainer,
  items,
  itemTheme = {},
  headerSection,
  footerSection,
  orientation: navOrientation = "vertical",
  density: navDensity = "comfortable",
  slotProps: SlotProps,
  slots,
  usePathname,
  children,
  mobileModeQuery = (theme) => theme.breakpoints.down("lg"),
  hideSubHeader = false,
  width: navWidth = initialNavigationBarWidth,
  height: navHeight = initialNavigationBarHeight,
  overrideLocalStorageKeys = initialNavigationBarLocalStorageKeys,
  disableToggleDensityButton: navDisableToggleDensityButton = false,
  disableStoringDataInLocalStorage = false,
  disableAutoOperationsOnMobileMode = false,
  ...props
}) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const [orientation, setOrientation] = React.useState(navOrientation);
  const [density, setDensity] = React.useState(navDensity);
  const [width, setWidth] = React.useState({
    ...initialNavigationBarWidth,
    ...navWidth,
  });
  const [height, setHeight] = React.useState({
    ...initialNavigationBarHeight,
    ...navHeight,
  });
  const [disableToggleDensityButton, setDisableToggleDensityButton] =
    React.useState(navDisableToggleDensityButton);

  /**
   * ------------------------------------------------------
   */
  const menuOpen = open ?? drawerOpen;
  const openMenu = React.useCallback(
    (e: React.SyntheticEvent<{}, Event>) => onOpen?.(e) ?? setDrawerOpen(true),
    [onOpen]
  );
  const closeMenu = React.useCallback(
    (e: React.SyntheticEvent<{}, Event>) =>
      onClose?.(e) ?? setDrawerOpen(false),
    [onClose]
  );

  /**
   * ------------------------------------------------------
   */
  const theme = useMuiTheme();
  const mobileMode = useMediaQuery(mobileModeQuery(theme));
  const classes = React.useMemo(
    () =>
      useUtilityClasses({
        classes: props.classes,
        orientation,
        density,
      }),
    [props.classes, orientation, density]
  );

  /**
   * Update state
   */
  React.useEffect(() => {
    setDensity(navDensity as Required<NavigationBarProps>["density"]);
    setOrientation(
      navOrientation as Required<NavigationBarProps>["orientation"]
    );
    setWidth(navWidth as Required<NavigationBarProps>["width"]);
    setHeight(navHeight as Required<NavigationBarProps>["height"]);
    setDisableToggleDensityButton(navDisableToggleDensityButton);
  }, [navDensity, navOrientation, navWidth, navDisableToggleDensityButton]);

  /**
   * Update localStorage
   */
  React.useEffect(() => {
    if (!disableStoringDataInLocalStorage) {
      setStorage(
        overrideLocalStorageKeys?.density ?? "rui-nav-density",
        density
      );
      setStorage(
        overrideLocalStorageKeys?.orientation ?? "rui-nav-orientation",
        orientation
      );
    }
  }, [
    disableStoringDataInLocalStorage,
    overrideLocalStorageKeys,
    density,
    orientation,
  ]);

  /**
   * Auto mobile mode operations
   */
  React.useEffect(() => {
    if (mobileMode && !disableAutoOperationsOnMobileMode) {
      setOrientation("vertical");
      setDensity("comfortable");
      setDisableToggleDensityButton(true);
    } else {
      setDisableToggleDensityButton(navDisableToggleDensityButton);
    }
  }, [mobileMode, disableAutoOperationsOnMobileMode]);

  const ownerState = React.useMemo(
    () => ({
      headerContainer: HeaderContainer,
      classes,
      items,
      orientation,
      density,
      width,
      height,
      headerSection: headerSection ?? null,
      footerSection: footerSection ?? null,
      itemTheme: {
        ...initialNavigationBarItemThemeProps,
        ...itemTheme,
        icon: {
          ...initialNavigationBarItemThemeProps.icon,
          ...itemTheme?.icon,
        },
      },
      hideSubHeader,
      overrideLocalStorageKeys,
      mobileModeQuery,
      disableToggleDensityButton,
      disableAutoOperationsOnMobileMode,
      disableStoringDataInLocalStorage,
      usePathname,
    }),
    [
      classes,
      items,
      orientation,
      width,
      height,
      density,
      headerSection,
      footerSection,
      HeaderContainer,
      itemTheme,
      hideSubHeader,
      overrideLocalStorageKeys,
      mobileModeQuery,
      disableToggleDensityButton,
      disableAutoOperationsOnMobileMode,
      disableStoringDataInLocalStorage,
    ]
  );

  const slotProps = React.useMemo(
    () => resolveSelector(SlotProps, ownerState),
    [ownerState, SlotProps]
  );

  const navigationBarContextValue: UseNavigationBarReturnValue = React.useMemo(
    () =>
      ({
        ...ownerState,
        slots,
        slotProps,
      }) as UseNavigationBarReturnValue,
    [ownerState, slots, slotProps]
  );

  /**
   * The main NavigationTreeView
   */
  const [TreeView, treeViewProps] = useSlotAndSlotProps(
    {
      slot: slots?.treeView,
      slotProps: slotProps?.treeView as NavigationTreeViewProps,
      elementType: NavigationTreeView,
      defaultProps: {
        items,
      },
    },
    [slotProps?.treeView, items]
  );

  /**
   * HeaderSection
   */
  const [HeaderSection, headerSectionProps] = useSlotAndSlotProps(
    {
      slot: slots?.headerSection,
      slotProps: slotProps?.headerSection,
      elementType: HeaderSectionStyled,
      defaultProps: {
        density,
        className: mergeClasses([classes.section, classes.headerSection]),
      },
    },
    [slotProps?.headerSection, classes.section, classes.headerSection, density]
  );

  /**
   * ToggleDensityButton
   */
  const [ToggleDensityButton, toggleDensityButtonProps] = useSlotAndSlotProps(
    {
      slot: slots?.toggleDensityButton,
      slotProps: slotProps?.toggleDensityButton,
      elementType: ToggleDensityButtonStyled,
      defaultProps: {
        size: "small",
        className: classes.toggleDensityButton,
        onClick: () =>
          setDensity((prev) =>
            prev === "compact" ? "comfortable" : "compact"
          ),
      },
    },
    [slotProps?.toggleDensityButton, classes.toggleDensityButton]
  );

  /**
   * toggleDensityButton children
   */
  const toggleDensityButtonChildren = React.useMemo(
    () =>
      density === "compact" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />,
    [density]
  );

  /**
   * renders the navigation bar with other components.
   */
  const renderNavigationBar = React.useMemo(
    () => (
      <>
        {headerSection && (
          <HeaderSection {...headerSectionProps}>{headerSection}</HeaderSection>
        )}

        {!disableToggleDensityButton && orientation === "vertical" && (
          <ToggleDensityButton {...toggleDensityButtonProps}>
            {toggleDensityButtonChildren}
          </ToggleDensityButton>
        )}

        <TreeView {...treeViewProps} />
      </>
    ),
    [
      headerSection,
      HeaderSection,
      headerSectionProps,
      disableToggleDensityButton,
      orientation,
      ToggleDensityButton,
      toggleDensityButtonProps,
      toggleDensityButtonChildren,
      TreeView,
      treeViewProps,
    ]
  );

  /**
   * RootNav
   */
  const [RootNav, rootNavProps] = useSlotAndSlotProps(
    {
      slot: slots?.rootNav,
      slotProps: slotProps?.rootNav,
      elementType: RootNavStyled,
      defaultProps: {
        width: width?.[density] as number,
        height: height?.[density] as number,
        orientation,
        density,
        hideSubHeader,
        className: classes.rootNav,
      },
    },
    [
      slotProps?.rootNav,
      orientation,
      width,
      height,
      density,
      hideSubHeader,
      classes.rootNav,
    ]
  );

  /**
   * LayoutRoot
   */
  const [LayoutRoot, layuotProps] = useSlotAndSlotProps(
    {
      slot: slots?.layout,
      slotProps: slotProps?.layout,
      elementType: LayoutStyled,
      defaultProps: {
        className: classes.layout,
        orientation,
        width: width?.[density] as number,
      },
    },
    [slotProps?.layout, classes.layout, orientation, width?.[density]]
  );

  /**
   * Main
   */
  const [Main, mainProps] = useSlotAndSlotProps(
    {
      slot: slots?.main,
      slotProps: slotProps?.main,
      elementType: MainStyled,
      defaultProps: {
        className: classes.main,
      },
    },
    [slotProps?.main, classes.main]
  );

  /**
   * MainContainer
   */
  const [MainContainer, mainContainerProps] = useSlotAndSlotProps(
    {
      slot: slots?.mainContainer,
      slotProps: slotProps?.mainContainer,
      elementType: MainContainerStyled,
      defaultProps: {
        className: classes.mainContainer,
      },
    },
    [slotProps?.mainContainer, classes.mainContainer]
  );

  /**
   * SwipeableDrawerRoot
   */
  const [SwipeableDrawerRoot, swipeableDrawerProps] = useSlotAndSlotProps(
    {
      slot: slots?.swipeableDrawer,
      slotProps: slotProps?.swipeableDrawer,
      elementType: SwipeableDrawerStyled,
      defaultProps: {
        open: menuOpen,
        onClose: closeMenu,
        onOpen: openMenu,
        component: "nav",
        className: classes.swipeableDrawer,
      },
    },
    [
      slotProps?.swipeableDrawer,
      menuOpen,
      closeMenu,
      openMenu,
      classes.swipeableDrawer,
    ]
  );

  /**
   * NavigationBarRoot
   */
  const [NavigationBarRoot, navigationBarRootProps] = useSlotAndSlotProps(
    {
      slot: slots?.root,
      slotProps: slotProps?.root,
      elementType: NavigationBarRootStyled,
      defaultProps: {
        className: classes.root,
        "aria-orientation": orientation,
      },
    },
    [slotProps?.root, classes.root, orientation]
  );

  /**
   * NavigationBar rootHorizontalContainer
   */
  const [RootHorizontalContainer, rootHorizontalContainerProps] =
    useSlotAndSlotProps(
      {
        slot: slots?.rootHorizontalContainer,
        slotProps: slotProps?.rootHorizontalContainer,
        elementType: RootHorizontalContainerStyled,
        defaultProps: {
          className: classes.rootHorizontalContainer,
        },
      },
      [slotProps?.rootHorizontalContainer, classes.rootHorizontalContainer]
    );

  /**
   * The instances
   */
  const memoizedInstances = React.useMemo(
    () => ({
      setDensity,
      setOrientation,
      setWidth,
      setHeight,
      setDisableToggleDensityButton,
    }),
    []
  );
  const navigationBarContextInstancesValue = React.useMemo(
    () =>
      ({
        ...memoizedInstances,
        onOpen: openMenu,
        onClose: closeMenu,
      }) as UseNavigationBarInstancesReturnValue,
    [openMenu, closeMenu]
  );

  const renderHeaderContainer = React.useMemo(
    () => HeaderContainer && <HeaderContainer />,
    [HeaderContainer]
  );

  const renderRootNavWithHeaderContainer = React.useMemo(
    () => (
      <>
        {orientation === "horizontal" && renderHeaderContainer}

        {!mobileMode && (
          <RootNav {...rootNavProps}>{renderNavigationBar}</RootNav>
        )}
      </>
    ),
    [
      orientation,
      renderHeaderContainer,
      mobileMode,
      RootNav,
      rootNavProps,
      renderNavigationBar,
    ]
  );

  return (
    <NavigationBarInstances.Provider value={navigationBarContextInstancesValue}>
      <NavigationBarContext.Provider value={navigationBarContextValue}>
        <NavigationBarRoot {...navigationBarRootProps}>
          {orientation === "horizontal" ? (
            <RootHorizontalContainer {...rootHorizontalContainerProps}>
              {renderRootNavWithHeaderContainer}
            </RootHorizontalContainer>
          ) : (
            renderRootNavWithHeaderContainer
          )}

          <LayoutRoot {...layuotProps}>
            {orientation === "vertical" && renderHeaderContainer}

            <Main {...mainProps}>
              <MainContainer {...mainContainerProps}>{children}</MainContainer>
            </Main>
          </LayoutRoot>

          {mobileMode && (
            <SwipeableDrawerRoot {...swipeableDrawerProps}>
              {renderNavigationBar}
            </SwipeableDrawerRoot>
          )}
        </NavigationBarRoot>
      </NavigationBarContext.Provider>
    </NavigationBarInstances.Provider>
  );
};

interface NavigationBarComponent {
  (props: NavigationBarProps): React.JSX.Element;
  propTypes?: any;
}

export default NavigationBar;
