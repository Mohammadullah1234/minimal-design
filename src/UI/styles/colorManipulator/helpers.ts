"use client";
import { rgbToHex } from "./colorManipulator";

export function intToHex(int: number): string {
  const hex = int.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

// RGB to HSL
export function rgbToHsl(
  r: number,
  g: number,
  b: number
): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));

  if (d !== 0) {
    switch (max) {
      case r:
        h = ((g - b) / d) % 6;
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }

  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

// HSL to RGB
export function hslToRgbByNumbers(
  h: number,
  s: number,
  l: number
): [number, number, number] {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [
    Math.round(f(0) * 255),
    Math.round(f(8) * 255),
    Math.round(f(4) * 255),
  ];
}

// Output Formatters
export function formatRgbToHex(
  r: number,
  g: number,
  b: number,
  a?: number
): string {
  return rgbToHex(
    typeof a === "number" && a < 1
      ? `rgba(${r}, ${g}, ${b}, ${+a.toFixed(2)})`
      : `rgb(${r}, ${g}, ${b})`
  );
}

export function formatRgb(r: number, g: number, b: number, a?: number): string {
  return typeof a === "number" && a < 1
    ? `rgba(${r}, ${g}, ${b}, ${+a.toFixed(2)})`
    : `rgb(${r}, ${g}, ${b})`;
}

export function formatHsl(h: number, s: number, l: number, a?: number): string {
  return typeof a === "number" && a < 1
    ? `hsla(${h}, ${s}%, ${l}%, ${+a.toFixed(2)})`
    : `hsl(${h}, ${s}%, ${l}%)`;
}
