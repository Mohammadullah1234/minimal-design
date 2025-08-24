import generateUtilityClass from "@/UI/utils/generateUtilityClass";
import generateUtilityClasses from "@/UI/utils/generateUtilityClasses";

export type ScrollBarClasses = {
  /**
   * Styles applied to the `root` element.
   */
  root: string;
  /**
   * Styles applied to the scrollBar `wrapper` element.
   */
  wrapper: string;
  /**
   * Styles applied to the scrollBar `mask` element.
   */
  mask: string;
  /**
   * Styles applied to the scrollBar `offset` element.
   */
  offset: string;
  /**
   * Styles applied to the scrollBar `content-wrapper` element.
   */
  "content-wrapper": string;
  /**
   * Styles applied to the scrollBar main `simplebar-content` element.
   */
  content: string;
  /**
   * Styles applied to the scrollBar element when hides.
   */
  "hide-scrollbar": string;
  /**
   * Styles applied to the scrollBar `placeholder` element.
   */
  placeholder: string;
  /**
   * Styles applied to the scrollBar `height-auto-observer-wrapper` element.
   */
  "height-auto-observer-wrapper": string;
  /**
   * Styles applied to the scrollBar `height-auto-observer` element.
   */
  "height-auto-observer": string;
  /**
   * Styles applied to the scrollBar `track` element.
   */
  track: string;
  /**
   * Styles applied to the scrollBar `track` horizontal element.
   */
  trackHorizontal: string;
  /**
   * Styles applied to the scrollBar `track` vertical element.
   */
  trackVertical: string;
  /**
   * Styles applied to the scrollBar `dragging` element.
   */
  dragging: string;
  /**
   * Styles applied to the scrollBar before element.
   */
  "scrollbar:before": string;
  /**
   * Styles applied to the scrollBar `visible` before element.
   */
  "scrollbar.simplebar-visible:before": string;
};

export type ScrollBarClassesKey = keyof ScrollBarClasses;

export function generateScrollBarUtilityClass(slot: string): string {
  return generateUtilityClass("RuiScrollBar", slot);
}

const scrollBarClasses: ScrollBarClasses = {
  ...generateUtilityClasses("RuiScrollBar", ["root"]),
  ...generateUtilityClasses(
    "simplebar",
    [
      "wrapper",
      "mask",
      "offset",
      "content-wrapper",
      "content",
      "hide-scrollbar",
      "placeholder",
      "height-auto-observer-wrapper",
      "height-auto-observer",
      "track",
      "dragging",
      "scrollbar:before",
      "scrollbar.simplebar-visible:before",
    ],
    (key, value) => `${key}-${value}`
  ),
  trackHorizontal: "simplebar-track.simplebar-horizontal",
  trackVertical: "simplebar-track.simplebar-vertical",
};

export default scrollBarClasses;
