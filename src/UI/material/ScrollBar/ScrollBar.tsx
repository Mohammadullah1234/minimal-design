"use client";

import * as React from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { CSSProperties, styled, Theme } from "@/UI/styles/MuiStyles";
import mergeClasses from "@/UI/utils/mergeClasses";
import { pxToRem } from "@/UI/utils/font";
import { SlotProps } from "@/UI/material/utils";
import scrollBarClasses, { ScrollBarClasses } from "./scrollBarClasses";
import { useMinimalTheme } from "@/UI/styles/hooks";
import resolveSelector from "@/UI/utils/resolveSelector";

const ScrollBarRoot = styled(SimpleBar, {
  shouldForwardProp: (prop: string) =>
    !["fillContent", "scrollBarTheme", "disableRootStyles", "sx"].includes(
      prop
    ),
})<ScrollBarOwnProps>(({
  theme,
  disableRootStyles,
  fillContent,
  scrollBarTheme: scrollBarThemeStyles,
}) => {
  const minimalPalette = useMinimalTheme().palette;
  const scrollBarTheme = resolveSelector(scrollBarThemeStyles, theme);

  return {
    ...(!disableRootStyles && {
      minWidth: 0,
      minHeight: 0,
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
    }),

    [`.${scrollBarClasses.wrapper}`]: scrollBarTheme?.wrapper,

    [`.${scrollBarClasses.mask}`]: scrollBarTheme?.mask,

    [`.${scrollBarClasses.offset}`]: scrollBarTheme?.offset,

    [`.${scrollBarClasses["content-wrapper"]}`]:
      scrollBarTheme?.["content-wrapper"],

    [`.${scrollBarClasses.content}`]: {
      ...(fillContent && {
        display: "flex",
        flex: "1 1 auto",
        minHeight: "100%",
        flexDirection: "column",
      }),
      ...scrollBarTheme?.content,
    },

    [`.${scrollBarClasses["hide-scrollbar"]}`]:
      scrollBarTheme?.["hide-scrollbar"],

    [`.${scrollBarClasses.placeholder}`]: scrollBarTheme?.placeholder,

    [`.${scrollBarClasses["height-auto-observer-wrapper"]}`]:
      scrollBarTheme?.["height-auto-observer-wrapper"],

    [`.${scrollBarClasses["height-auto-observer"]}`]:
      scrollBarTheme?.["height-auto-observer"],

    [`.${scrollBarClasses.track}`]: scrollBarTheme?.track,

    [`.${scrollBarClasses.dragging}`]: scrollBarTheme?.dragging,

    [`.${scrollBarClasses["scrollbar:before"]}`]: {
      background: minimalPalette.grey[500],
      ...scrollBarTheme?.["scrollbar:before"],
    },

    [`.${scrollBarClasses["scrollbar.simplebar-visible:before"]}`]:
      scrollBarTheme?.["scrollbar.simplebar-visible:before"],

    [`.${scrollBarClasses.trackVertical}`]: {
      ...(scrollBarTheme?.width && {
        width: pxToRem(scrollBarTheme?.width),
      }),
      ...scrollBarTheme?.trackVertical,
    },

    [`.${scrollBarClasses.trackHorizontal}`]: {
      ...(scrollBarTheme?.height && {
        height: pxToRem(scrollBarTheme?.height),
      }),
      ...scrollBarTheme?.trackHorizontal,
    },
  };
});

/**
 * `ScrollBar` renders best and modren design scrollbar for scrolling.
 */
const ScrollBar = ({
  scrollBarTheme,
  disableRootStyles = false,
  fillContent = true,
  ref,
  ...props
}: ScrollBarProps) => {
  return (
    <ScrollBarRoot
      scrollableNodeProps={{ ref }}
      clickOnTrack={false}
      fillContent={fillContent}
      scrollBarTheme={scrollBarTheme}
      disableRootStyles={disableRootStyles}
      {...props}
      className={mergeClasses([scrollBarClasses.root, props?.className])}
    />
  );
};

export type ScrollBarTheme = Partial<
  Record<keyof Omit<ScrollBarClasses, "root">, CSSProperties>
> & {
  /**
   * Defines the scrollBar `track` width.
   */
  width?: number;
  /**
   * Defines the scrollBar `track` height.
   */
  height?: number;
};

export interface ScrollBarOwnProps {
  /**
   * The `scrollBarTheme` use to customize the scrollBar easily.
   */
  scrollBarTheme?: ScrollBarTheme | ((theme: Theme) => ScrollBarTheme);
  /**
   * If it's true, the default root styles will be disabled.
   * @default false
   * 
   * @example
   * ```tsx
   * minWidth: 0,
     minHeight: 0,
     flexGrow: 1,
     display: "flex",
     flexDirection: "column",
   */
  disableRootStyles?: boolean;
  /**
   * Fills the content.
   * @default true
   * 
   * @example
   * ```tsx
   * display: "flex",
     flex: "1 1 auto",
     minHeight: "100%",
     flexDirection: "column",
   */
  fillContent?: boolean;
}

export type ScrollBarProps<TOverrides = {}> = ScrollBarOwnProps &
  SlotProps<typeof SimpleBar, TOverrides>;

export default ScrollBar;
