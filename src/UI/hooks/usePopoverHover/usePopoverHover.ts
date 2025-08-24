"use client";
import * as React from "react";

export type UsePopoverHoverProps<T extends HTMLElement = HTMLElement> = {
  open: boolean;
  anchorEl: T | null;
  onOpen: () => void;
  onClose: () => void;
  elementRef: React.RefObject<T>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
/**
 * Custom hook to manage the state of a popover that opens on hover.
 *
 * @param {RefObject<T | null>} [inputRef] - An optional ref object to use for the popover element.
 *
 * @returns {UsePopoverHoverProps<T>} - An object containing:
 * - `open`: A boolean indicating whether the popover is open.
 * - `onOpen`: A function to open the popover.
 * - `anchorEl`: The current element that the popover is anchored to.
 * - `onClose`: A function to close the popover.
 * - `elementRef`: A ref object for the popover element.
 * - `setOpen`: A function to manually set the open state of the popover.
 *
 * @example
 * const { open, onOpen, onClose, elementRef } = usePopoverHover<HTMLButtonElement>();
 *
 * return (
 *   <>
 *      <button ref={elementRef} onMouseEnter={onOpen} onMouseLeave={onClose}>
 *        Hover me
 *      </button>
 *
 *      <Popover open={open} anchorEl={anchorEl}>
 *        Popover content
 *      </Popover>
 *   </>
 * );
 */
export default function usePopoverHover<T extends HTMLElement = HTMLElement>(
  inputRef?: React.RefObject<T | null>
): UsePopoverHoverProps<T> {
  let ref = React.useRef(null),
    elementRef = inputRef || ref,
    [open, setOpen] = React.useState<boolean>(!1),
    onOpen = React.useCallback(() => {
      setOpen(!0);
    }, []),
    onClose = React.useCallback(() => {
      setOpen(!1);
    }, []);

  return {
    elementRef: elementRef as React.RefObject<T>,
    anchorEl: elementRef.current,
    open,
    onOpen,
    onClose,
    setOpen,
  };
}
