"use client";
import * as React from "react";

export type UseCopyToClipboardProps = {
  copy: CopyFn;
  copiedText: CopiedValue;
};
export type CopiedValue = string | null;
export type CopyFn = (text: string) => Promise<boolean>;

/**
 * Custom hook to copy text to the clipboard.
 *
 * @returns {UseCopyToClipboardProps} - An object containing:
 * - `copy`: A function to copy text to the clipboard.
 * - `copiedText`: The last copied text or null if nothing has been copied.
 *
 * @example
 * const { copy, copiedText } = useCopyToClipboard();
 *
 * return (
 *   <div>
 *     <button onClick={() => copy('Hello, World!')}>Copy Text</button>
 *     {copiedText && <p>Copied: {copiedText}</p>}
 *   </div>
 * );
 */
export default function useCopyToClipboard(): UseCopyToClipboardProps {
  let [state, setState] = React.useState<string | null>(null);

  return {
    copy: React.useCallback(
      async (text: string) => {
        if (!navigator?.clipboard)
          return (console.warn("Clipboard not supported"), !1);
        try {
          return (
            await navigator.clipboard.writeText(text),
            setState(text),
            !0
          );
        } catch (err) {
          return (console.warn("Copy failed", err), setState(null), !1);
        }
      },
      [setState]
    ),
    copiedText: state,
  };
}
