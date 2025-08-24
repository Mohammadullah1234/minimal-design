"use strict";

const font =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

/**
 * Converts px to rem.
 *
 * @param {number} value - The pixel value to convert.
 * @returns {string} - The equivalent value in rem.
 * @throws {Error} - Throws an error if the pixel value is invalid.
 *
 * @example
 * const remValue = pxToRem(24);
 * console.log(remValue); // "1.5rem"
 */
export function pxToRem(value: number): string {
  if (typeof value != "number" || isNaN(value))
    throw new Error(`Invalid pixel value: ${value}`);

  const stringOutput = (value / 16).toString();
  const numberOutput = value / 16;
  return `${
    stringOutput.length > 6 ? numberOutput.toFixed(4) : stringOutput
  }rem`;
}

/**
 * Converts rem to px.
 *
 * @param {string} value - The rem value to convert.
 * @returns {number} - The equivalent value in pixels.
 * @throws {Error} - Throws an error if the rem value is invalid.
 *
 * @example
 * const pixels = remToPx('1.5rem');
 * console.log(pixels); // 24
 */
export function remToPx(value: string): number {
  if (typeof value != "string") throw new Error(`Invalid rem value: ${value}`);

  const num = parseFloat(value);
  return Math.round(num * 16);
}

/**
 * Formats the font family.
 *
 * @param {string} [fontName] - The name of the font to format.
 * @returns {string} - The complete font family string.
 *
 * @example
 * const fontFamily = formatFont('CustomFont');
 * console.log(fontFamily); // "CustomFont, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol""
 */
export function formatFont(fontName?: string): string {
  return fontName ? `"${fontName}", ${font}` : font;
}
