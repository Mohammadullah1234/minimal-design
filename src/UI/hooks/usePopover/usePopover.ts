"use client";
import * as React from "react";

export type UsePopoverProps<T extends HTMLElement = HTMLElement> = {
  open: boolean;
  anchorEl: T | null;
  onClose: () => void;
  onOpen: (event: React.MouseEvent<T>) => void;
  setAnchorEl: React.Dispatch<React.SetStateAction<T | null>>;
};

/**
 * Custom hook to manage the state of a popover.
 *
 * @returns {UsePopoverProps<T>} - An object containing:
 * - `open`: A boolean indicating whether the popover is open.
 * - `anchorEl`: The current element that the popover is anchored to.
 * - `onClose`: A function to close the popover.
 * - `onOpen`: A function to open the popover.
 * - `setAnchorEl`: A function to manually set the anchor element.
 *
 * @example
 * const { open, anchorEl, onOpen, onClose } = usePopover<HTMLButtonElement>();
 *
 * return (
 *   <>
 *     <button variant="filled" onClick={onOpen}>Click me</button>
 *
 *     <Popover open={open} onClose={onClose} anchorEl={anchorEl}>
 *        Popover content
 *      </Popover>
 *   </>
 * );
 */
export default function usePopover<
  T extends HTMLElement = HTMLElement,
>(): UsePopoverProps<T> {
  let [state, setState] = React.useState<UsePopoverProps<T>["anchorEl"]>(null),
    onOpen = React.useCallback((event: React.MouseEvent<T>) => {
      setState(event.currentTarget);
    }, []),
    onClose = React.useCallback(() => {
      setState(null);
    }, []);

  return {
    open: !!state,
    anchorEl: state as UsePopoverProps<T>["anchorEl"],
    onOpen,
    onClose,
    setAnchorEl: setState,
  };
}
