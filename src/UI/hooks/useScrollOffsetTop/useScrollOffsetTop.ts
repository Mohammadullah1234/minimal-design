"use client";
import * as React from "react";

export type UseScrollOffsetTopProps<T extends HTMLElement = HTMLElement> = {
  offsetTop: boolean;
  elementRef: React.RefObject<T>;
};

/**
 * Custom hook to manage the offset top state based on scroll position.
 *
 * @param {number} [defaultValue=0] - The offset value at which the state changes.
 *
 * @returns {UseScrollOffsetTopProps<T>} - An object containing:
 * - `offsetTop`: A boolean indicating whether the scroll position is past the offset.
 * - `elementRef`: A ref object to attach to the element to track its offset.
 *
 * @example
 * 1.Applies to top <header/>
 * const { offsetTop } = useScrollOffsetTop(80);
 *
 * Or
 *
 * 2.Applies to element
 * const { offsetTop, elementRef } = useScrollOffsetTop(80);
 * <div ref={elementRef} />
 */
export default function useScrollOffsetTop<T extends HTMLElement = HTMLElement>(
  defaultValue: number = 0
): UseScrollOffsetTopProps<T> {
  let ref = React.useRef<T>(null),
    [state, setState] = React.useState(!1),
    handleScroll = React.useCallback(() => {
      let scrollY = window.scrollY;

      if (ref.current) {
        let offsetTop = ref.current.offsetTop;
        setState(scrollY > offsetTop - defaultValue);
      } else setState(scrollY > defaultValue);
    }, [defaultValue]);

  return (
    React.useEffect(
      () => (
        handleScroll(),
        window.addEventListener("scroll", handleScroll),
        () => {
          window.removeEventListener("scroll", handleScroll);
        }
      ),
      [handleScroll]
    ),
    { elementRef: ref as React.RefObject<T>, offsetTop: state }
  );
}
