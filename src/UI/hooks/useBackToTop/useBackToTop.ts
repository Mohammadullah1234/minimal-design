"use client";
import * as React from "react";

export type UseBackToTopProps = {
  isVisible: boolean;
  onBackToTop: () => void;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

function formatValue(value: string | number) {
  let newValue, type;

  if (typeof value == "string")
    if (value.endsWith("%")) {
      if (((newValue = Number(value.slice(0, -1))), isNaN(newValue)))
        throw new Error("Invalid percentage value");
      type = "percentage";
    } else throw new Error("String input must end with %");
  else ((newValue = value), (type = "number"));

  return { value: newValue, type };
}

/**
 * Custom hook to manage the visibility of a "Back to Top" button based on scroll position.
 *
 * @param {string | number} defaultValue - The scroll progress percentage (e.g., '90%') or distance in pixels (e.g., 80) at which the button becomes visible.
 * - If `defaultValue` is a percentage string (e.g., '90%'), the button becomes visible when the scroll distance is that percentage from the top.
 * - If `defaultValue` is a number (e.g., 80), the button becomes visible when the scroll distance is that many pixels from the bottom.
 * @param {boolean} [isDebounce=false] - Whether to debounce the scroll handler to improve performance.
 *
 * @returns {UseBackToTopProps} - An object containing:
 * - `isVisible`: A boolean indicating whether the "Back to Top" button should be visible.
 * - `onBackToTop`: A function to scroll the window back to the top smoothly.
 * - `setIsVisible`: A function to manually set the visibility of the "Back to Top" button.
 *
 * @example
 * const { isVisible, onBackToTop } = useBackToTop('90%');
 * const { isVisible, onBackToTop } = useBackToTop(80);
 *
 * return (
 *   <button onClick={onBackToTop} style={{ display: isVisible ? 'block' : 'none' }}>
 *     Back to Top
 *   </button>
 * );
 */
export default function useBackToTop(
  defaultValue: string | number,
  isDebounce?: boolean
): UseBackToTopProps {
  let [isVisible, setIsVisible] = React.useState(!1),
    getValue = formatValue(defaultValue),
    handleScroll = React.useCallback(() => {
      let innerHeight = window.innerHeight,
        scrollY = Math.round(window.scrollY),
        offsetHeight = document.body.offsetHeight,
        scrollHeight = Math.round(
          (scrollY / (offsetHeight - innerHeight)) * 100
        );

      if (getValue.type === "percentage")
        setIsVisible(scrollHeight >= getValue.value);
      else {
        let scrollHeight = offsetHeight - innerHeight - scrollY;
        setIsVisible(getValue.value >= scrollHeight);
      }
    }, [getValue.type, getValue.value]),
    timerScroll = React.useMemo(() => {
      let interval: NodeJS.Timeout;
      return () => {
        (clearTimeout(interval), (interval = setTimeout(handleScroll, 100)));
      };
    }, [handleScroll]);

  return (
    React.useEffect(() => {
      let handleScrollEvent = isDebounce ? timerScroll : handleScroll;

      return (
        window.addEventListener("scroll", handleScrollEvent),
        () => {
          window.removeEventListener("scroll", handleScrollEvent);
        }
      );
    }, [timerScroll, handleScroll, isDebounce]),
    {
      isVisible,
      onBackToTop: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      setIsVisible,
    }
  );
}
