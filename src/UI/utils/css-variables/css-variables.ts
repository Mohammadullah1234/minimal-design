"use strict";

/**
 * Extract the CSS variable name from a `var(--...)` expression.
 *
 * @param cssValue - A string like `var(--variable-name)` or `var(--variable-name, fallback)`.
 * @returns The extracted CSS variable name (e.g., '--palette-Tooltip-bg').
 *
 * @example
 * getCssVarName('var(--palette-Tooltip-bg)'); // → '--palette-Tooltip-bg'
 * getCssVarName('var(--palette-Tooltip-bg, rgba(69, 79, 91, 0.92))'); // → '--palette-Tooltip-bg'
 * getCssVarName(theme.vars.palette.Tooltip.bg); // → '--palette-Tooltip-bg'
 */
export function getCssVarName(cssValue: unknown): string {
  if (typeof cssValue != "string" || !cssValue.trim())
    return (
      console.error("Invalid input: CSS value must be a non-empty string"),
      ""
    );
  let value = cssValue.match(/var\(\s*(--[\w-]+)(?:\s*,[^)]*)?\s*\)/);
  return value
    ? value[1]
    : (console.error(
        `Invalid CSS variable format: "${cssValue}". Expected format: var(--variable-name)`
      ),
      "");
}
