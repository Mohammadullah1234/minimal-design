/* eslint-disable @typescript-eslint/naming-convention */
import clamp from "@/UI/utils/clamp";
import { prefixClass } from "@/UI/utils/generateUtilityClass";
import {
  formatHsl,
  formatRgb,
  formatRgbToHex,
  hslToRgbByNumbers,
  intToHex,
  rgbToHsl,
} from "./helpers";

/* eslint-disable @typescript-eslint/naming-convention */
export type ColorFormat = "rgb" | "rgba" | "hsl" | "hsla" | "color";
export interface ColorObject {
  type: ColorFormat;
  values: [number, number, number] | [number, number, number, number];
  colorSpace?: "srgb" | "display-p3" | "a98-rgb" | "prophoto-rgb" | "rec-2020";
}

export type ParsedColor = {
  format: "rgb" | "hsl" | "hex";
  values: [number, number, number];
  alpha?: number;
};

// helpers ------------------------------------------------------

// methods ------------------------------------------------------
/**
 * Returns a number whose value is limited to the given range.
 * @param {number} value The value to be clamped
 * @param {number} min The lower boundary of the output range
 * @param {number} max The upper boundary of the output range
 * @returns {number} A number in the range [min, max]
 */
export function clampWrapper(
  value: number,
  min: number = 0,
  max: number = 1
): number {
  if (process.env.NODE_ENV !== "production") {
    if (value < min || value > max) {
      console.error(
        `${prefixClass}: The value provided ${value} is out of range [${min}, ${max}].`
      );
    }
  }
  return clamp(value, min, max);
}

/**
 * Returns an object with the type and values of a color.
 *
 * Note: Does not support rgb % values.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {object} - A color object:
 * ```ts
 * {format: "rgb" | "hsl" | "hex", values: number[], alpha?: number}
 */
export function parseColor(color: string): ParsedColor {
  color = color.trim().toLowerCase();

  const marker = color.startsWith("#") ? 1 : color.indexOf("(");
  const type = color.slice(0, marker);
  if (!["rgb", "rgba", "hsl", "hsla", "#"].includes(type)) {
    throw new Error(
      `${prefixClass}: Unsupported \`${color}\` color.\n` +
        "The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()."
    );
  }

  // HEX (#RGB, #RGBA, #RRGGBB, #RRGGBBAA)
  const hexMatch = color.match(/^#?([\da-f]{3,8})$/i);
  if (hexMatch) {
    let hex = hexMatch[1];
    if (hex.length === 3 || hex.length === 4) {
      hex = hex
        .split("")
        .map((ch) => ch + ch)
        .join("");
    }
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const a =
      hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : undefined;
    return { format: "hex", values: [r, g, b], alpha: a };
  }

  // RGB / RGBA
  const rgbMatch = color.match(/rgba?\(([^)]+)\)/);
  if (rgbMatch) {
    const parts = rgbMatch[1].split(",").map((p) => parseFloat(p.trim()));
    const [r, g, b, a] = parts;
    return { format: "rgb", values: [r, g, b], alpha: a };
  }

  // HSL / HSLA
  const hslMatch = color.match(/hsla?\(([^)]+)\)/);
  if (hslMatch) {
    const parts = hslMatch[1].split(",").map((p) => p.trim());
    const h = parseFloat(parts[0]);
    const s = parseFloat(parts[1]);
    const l = parseFloat(parts[2]);
    const a = parts[3] ? parseFloat(parts[3]) : undefined;
    return { format: "hsl", values: [h, s, l], alpha: a };
  }

  throw new Error(`Unsupported color format: ${color}`);
}

/**
 * Converts a CSS color to diffrent types color
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {"rgb" | "hsl" | "hex"} target - The target of color to convert.
 * @returns A CSS color string
 */
export function convertColor(
  color: string,
  target: "rgb" | "hsl" | "hex"
): string {
  const { format, values, alpha } = parseColor(color);

  if (format === target) {
    // Just return the normalized version
    if (target === "hex") return formatRgbToHex(...values, alpha);
    if (target === "rgb") return formatRgb(...values, alpha);
    if (target === "hsl") return formatHsl(...values, alpha);
  }

  let r: number, g: number, b: number;

  if (format === "hex" || format === "rgb") {
    [r, g, b] = values;
    if (target === "hex") return formatRgbToHex(r, g, b, alpha);
    if (target === "rgb") return formatRgb(r, g, b, alpha);
    if (target === "hsl") {
      const [h, s, l] = rgbToHsl(r, g, b);
      return formatHsl(h, s, l, alpha);
    }
  }

  if (format === "hsl") {
    const [h, s, l] = values;
    [r, g, b] = hslToRgbByNumbers(h, s, l);
    if (target === "hex") return formatRgbToHex(r, g, b, alpha);
    if (target === "rgb") return formatRgb(r, g, b, alpha);
    if (target === "hsl") return formatHsl(h, s, l, alpha);
  }

  throw new Error(`Conversion from ${format} to ${target} not supported.`);
}

/**
 * Converts a color from CSS hex format to CSS rgb format.
 * @param {string} color - Hex color, i.e. #nnn or #nnnnnn
 * @returns {string} A CSS rgb color string
 */
export function hexToRgb(color: string): string {
  color = color.slice(1);
  const re = new RegExp(`.{1,${color.length >= 6 ? 2 : 1}}`, "g");
  let colors = color.match(re) as any;

  if (colors && colors[0].length === 1) {
    colors = colors.map((n: any) => n + n);
  }

  if (process.env.NODE_ENV !== "production") {
    if (color.length !== color.trim().length) {
      console.error(
        `${prefixClass}: The color: "${color}" is invalid. Make sure the color input doesn't contain leading/trailing space.`
      );
    }
  }

  return colors
    ? `rgb${colors.length === 4 ? "a" : ""}(${colors
        .map((n: string, index: number) =>
          index < 3
            ? parseInt(n, 16)
            : Math.round((parseInt(n, 16) / 255) * 1000) / 1000
        )
        .join(", ")})`
    : "";
}

/**
 * Returns an object with the type and values of a color.
 *
 * Note: Does not support rgb % values.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @returns {object} - A MUI color object: {type: string, values: number[]}
 */
export function decomposeColor(color: string): ColorObject {
  if (typeof color !== "string") {
    return color;
  }

  if (color.charAt(0) === "#") {
    return decomposeColor(hexToRgb(color));
  }

  const marker = color.indexOf("(");
  const type = color.substring(0, marker) as ColorFormat;

  if (!["rgb", "rgba", "hsl", "hsla", "color"].includes(type)) {
    throw new Error(
      `${prefixClass}: Unsupported \`${color}\` color.\n` +
        "The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()."
    );
  }

  let valuesPart = color.substring(marker + 1, color.length - 1);
  let colorSpace: ColorObject["colorSpace"];

  if (type === "color") {
    const parts = valuesPart.split(" ");
    colorSpace = parts.shift() as ColorObject["colorSpace"];
    valuesPart = parts.join(" ");
  }

  const values = valuesPart
    .split(type === "color" ? " " : ",")
    .map((v) => parseFloat(v));

  return { type, values: values as ColorObject["values"], colorSpace };
}

/**
 * Returns a channel created from the input color.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @returns {string} - The channel for the color, that can be used in rgba or hsla colors
 */
export function colorChannel(color: string): string {
  const decomposed = decomposeColor(color);
  return decomposed.values
    .slice(0, 3)
    .map((val, idx) =>
      decomposed.type.includes("hsl") && idx !== 0 ? `${val}%` : val
    )
    .join(" ");
}

export function private_safeColorChannel(
  color: string,
  warning?: string
): string {
  try {
    return colorChannel(color);
  } catch (error) {
    if (warning && process.env.NODE_ENV !== "production") {
      console.warn(warning);
    }
    return color;
  }
}

/**
 * Converts a color object with type and values to a string.
 * @param {object} color - Decomposed color
 * @param {string} color.type - One of: 'rgb', 'rgba', 'hsl', 'hsla', 'color'
 * @param {array} color.values - [n,n,n] or [n,n,n,n]
 * @returns {string} A CSS color string
 */
export function recomposeColor(color: ColorObject): string {
  const { type, colorSpace } = color;
  let { values } = color;

  if (type.includes("rgb")) {
    values = values.map((n, i) => (i < 3 ? parseInt(String(n), 10) : n)) as any;
  } else if (type.includes("hsl")) {
    values[1] = `${values[1]}%` as unknown as number;
    values[2] = `${values[2]}%` as unknown as number;
  }

  const channel =
    type === "color" ? `${colorSpace} ${values.join(" ")}` : values.join(", ");
  return `${type}(${channel})`;
}

/**
 * Converts a color from CSS rgb format to CSS hex format.
 * @param {string} color - RGB color, i.e. rgb(n, n, n)
 * @returns {string} A CSS rgb color string, i.e. #nnnnnn
 */
export function rgbToHex(color: string): string {
  if (color.startsWith("#")) {
    return color;
  }
  const { values } = decomposeColor(color);
  return `#${values
    .map((n, i) => intToHex(i === 3 ? Math.round(255 * n) : n))
    .join("")}`;
}

/**
 * Converts a color from hsl format to rgb format.
 * @param {string} color - HSL color values
 * @returns {string} rgb color values
 */
export function hslToRgb(color: string): string {
  const decomposed = decomposeColor(color);
  const [h, s, l, a] = decomposed.values as [number, number, number, number?];
  const saturation = s / 100;
  const lightness = l / 100;
  const aFactor = saturation * Math.min(lightness, 1 - lightness);

  const f = (n: number, k: number = (n + h / 30) % 12) =>
    lightness - aFactor * Math.max(Math.min(k - 3, 9 - k, 1), -1);

  const rgb: number[] = [0, 8, 4].map((d) => Math.round(f(d) * 255));

  if (decomposed.type === "hsla" && a !== undefined) {
    (rgb as any).push(a);

    return recomposeColor({
      type: "rgba",
      values: rgb as [number, number, number, number],
    });
  }

  return recomposeColor({
    type: "rgb",
    values: rgb as [number, number, number],
  });
}

/**
 * The relative brightness of any point in a color space,
 * normalized to 0 for darkest black and 1 for lightest white.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @returns {number} The relative brightness of the color in the range 0 - 1
 */
export function getLuminance(color: string): number {
  const decomposed = decomposeColor(color);
  let rgbValues = decomposed.type.includes("hsl")
    ? decomposeColor(hslToRgb(color)).values
    : decomposed.values;

  const luminance = (rgbValues as number[]).map((val) => {
    const norm = decomposed.type !== "color" ? val / 255 : val;
    return norm <= 0.03928 ? norm / 12.92 : ((norm + 0.055) / 1.055) ** 2.4;
  });

  const lum =
    0.2126 * luminance[0] + 0.7152 * luminance[1] + 0.0722 * luminance[2];
  return Number(lum.toFixed(3));
}

/**
 * Calculates the contrast ratio between two colors.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param {string} foreground - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {string} background - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {number} A contrast ratio value in the range 0 - 21.
 */
export function getContrastRatio(
  foreground: string,
  background: string
): number {
  const a = getLuminance(foreground);
  const b = getLuminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

/**
 * Sets the absolute transparency of a color.
 * Any existing alpha values are overwritten.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} value - value to set the alpha channel to in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function alpha(color: string, value: number): string {
  const decomposed = decomposeColor(color);
  const clamped = clampWrapper(value);

  if (decomposed.type.includes("rgb")) {
    decomposed.type = (decomposed.type + "a") as "rgba" | "hsla" | "color";
  }
  if (decomposed.type === "color") {
    (decomposed.values as number[])[3] = clamped;
  } else {
    (decomposed.values as number[])[3] = clamped;
  }
  return recomposeColor(decomposed);
}

export type ColorChannel = `${string} ${string} ${string}` | `var(${string})`;
/**
 * Adds an alpha channel to a color.
 *
 * @param {ColorChannel} color - The color string in channels or CSS variable format.
 * @param {string | number} [opacity=1] - The opacity value.
 * @returns {string} The color string with alpha channel.
 * @throws {Error} - Throws an error if the color format is unsupported.
 *
 * @example
 * const rgbaColor = varAlpha('200 250 214', 0.8);
 * console.log(rgbaColor); // "rgba(200 250 214 / 0.8)"
 *
 * const hslaColor = varAlpha('0 0% 0%', 0.8);
 * console.log(hslaColor); // "hsla(0 0% 0% / 0.8)"
 *
 * const rgbaVarColor = varAlpha('var(--palette-primary-lighterChannel)', "26%");
 * console.log(rgbaVarColor); // "rgba(var(--palette-primary-lighterChannel) / 26%)"
 */
export function varAlpha(
  color: ColorChannel,
  opacity: string | number
): string {
  if (!color) throw new Error("[Alpha]: Color is undefined!");
  if (
    color.startsWith("#") ||
    color.startsWith("rgb") ||
    color.startsWith("rgba") ||
    (!color.includes("var") && color.includes("Channel"))
  )
    throw new Error(
      [
        `[Alpha]: Unsupported color format "${color}"`,
        "Supported formats are:",
        '- RGB channels: "0 184 217"',
        '- CSS variables with "Channel" prefix: "var(--palette-common-blackChannel, #000000)"',
        "Unsupported formats are:",
        '- Hex: "#00B8D9"',
        '- RGB: "rgb(0, 184, 217)"',
        '- RGBA: "rgba(0, 184, 217, 1)"',
      ].join(`
`)
    );

  return `${color.includes("%") ? "hsla" : "rgba"}(${color} / ${opacity})`;
}

export function private_safeAlpha(
  color: string,
  value: number,
  warning?: string
): string {
  try {
    return alpha(color, value);
  } catch (error) {
    if (warning && process.env.NODE_ENV !== "production") {
      console.warn(warning);
    }
    return color;
  }
}

/**
 * Darkens a color.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function darken(color: string, coefficient: number): string {
  const decomposed = decomposeColor(color);
  const c = clampWrapper(coefficient);

  if (decomposed.type.includes("hsl")) {
    decomposed.values[2]! *= 1 - c;
  } else {
    for (let i = 0; i < 3; i++) {
      decomposed.values[i]! *= 1 - c;
    }
  }

  return recomposeColor(decomposed);
}

export function private_safeDarken(
  color: string,
  coefficient: number,
  warning?: string
): string {
  try {
    return darken(color, coefficient);
  } catch (error) {
    if (warning && process.env.NODE_ENV !== "production") {
      console.warn(warning);
    }
    return color;
  }
}

/**
 * Lightens a color.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function lighten(color: string, coefficient: number): string {
  const decomposed = decomposeColor(color);
  const c = clampWrapper(coefficient);

  if (decomposed.type.includes("hsl")) {
    decomposed.values[2]! += (100 - decomposed.values[2]!) * c;
  } else {
    for (let i = 0; i < 3; i++) {
      decomposed.values[i]! += (255 - decomposed.values[i]!) * c;
    }
  }

  return recomposeColor(decomposed);
}

export function private_safeLighten(
  color: string,
  coefficient: number,
  warning?: string
): string {
  try {
    return lighten(color, coefficient);
  } catch (error) {
    if (warning && process.env.NODE_ENV !== "production") {
      console.warn(warning);
    }
    return color;
  }
}

/**
 * Darken or lighten a color, depending on its luminance.
 * Light colors are darkened, dark colors are lightened.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} coefficient=0.15 - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function emphasize(color: string, coefficient: number = 0.15): string {
  return getLuminance(color) > 0.5
    ? darken(color, coefficient)
    : lighten(color, coefficient);
}

export function private_safeEmphasize(
  color: string,
  coefficient: number,
  warning?: string
): string {
  try {
    return emphasize(color, coefficient);
  } catch (error) {
    if (warning && process.env.NODE_ENV !== "production") {
      console.warn(warning);
    }
    return color;
  }
}

/**
 * Blend a transparent overlay color with a background color, resulting in a single
 * RGB color.
 * @param {string} background - CSS color
 * @param {string} overlay - CSS color
 * @param {number} opacity - Opacity multiplier in the range 0 - 1
 * @param {number} [gamma=1.0] - Gamma correction factor. For gamma-correct blending, 2.2 is usual.
 */
export function blend(
  background: string,
  overlay: string,
  opacity: number,
  gamma: number = 1.0
): string {
  const blendChannel = (b: number, o: number) =>
    Math.round(
      (b ** (1 / gamma) * (1 - opacity) + o ** (1 / gamma) * opacity) ** gamma
    );
  const bCol = decomposeColor(background);
  const oCol = decomposeColor(overlay);
  const rgb = [0, 1, 2].map((i) =>
    blendChannel(bCol.values[i]!, oCol.values[i]!)
  );
  return recomposeColor({
    type: "rgb",
    values: rgb as [number, number, number],
  });
}

type InputPalette = Record<string, (string & ColorChannel) | undefined>;
type ChannelPalette<T extends InputPalette> = T & {
  [K in keyof T as `${string & K}Channel`]: string & ColorChannel;
};
/**
 * Converts a palette color to channels palette, it can support CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), hsl().
 * 
 * It can converts the below colors to channels.
 * 1. `hex` to rgb channel.
 * 2. `rgb` to rgb channel.
 * 3. `hsl` to hsl channel.
 * 
 * Note: You can't use the CSS alpha color, i.e. one of: #nnnnnnnn, rgba(), hsla().
 * @param {T} palette - The input palette object.
 * @returns - The output palette object with channels.

*
 * @example hex to rgb channel

const palette = createPaletteChannel({
  lighter: "#C8FAD6",
  light: "#5BE49B",
  main: "#00A76F",
});
console.log(palette);
// {
//   lighter: "#C8FAD6",
//   light: "#5BE49B",
//   main: "#00A76F",
//   lighterChannel: "200 250 214",
//   lightChannel: "91 228 155",
//   mainChannel: "0 167 111",
// }
 * @example hsl to hsl channel

const palette = createPaletteChannel({
  lighter: "hsl(137, 83.30%, 88.20%)",
  light: "hsl(148, 71.70%, 62.50%)",
  main: "hsl(160, 100.00%, 32.70%)",
});
console.log(palette);
// {
//   lighter: "hsl(137, 83.30%, 88.20%)",
//   light: "hsl(148, 71.70%, 62.50%)",
//   main: "hsl(160, 100.00%, 32.70%)",
//   lighterChannel: "137 83.3 88.2",
//   lightChannel: "148 71.7 62.5",
//   mainChannel: "160 100 32.7",
// }
 */
export function createPaletteChannel<T extends InputPalette>(
  palette: T
): ChannelPalette<T> {
  const channel = {};

  return (Object.entries(palette).forEach(([key, value]) => {
    const { values } = parseColor(value as unknown as string);

    value && ((channel as any)[`${key}Channel`] = values.join(" "));
  }),
  { ...palette, ...channel }) as ChannelPalette<T>;
}

/**
 * Converts text to color.
 *
 * @param {string} text - Text to convert
 * @returns {string} A CSS rgb color string
 */
export function textToColor(text: string): string {
  // Convert string to hash
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert hash to HSL color
  const h = hash % 360; // Hue (0-360)
  const s = 70 + (hash % 10); // Saturation (70-80%)
  const l = 50 + (hash % 10); // Lightness (50-60%)

  return hslToRgb(`hsl(${h}, ${s}%, ${l}%)`);
}
