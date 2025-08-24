import {
  ColorChannel,
  createPaletteChannel,
  varAlpha,
} from "@/UI/styles/colorManipulator";
import { CommonColors } from "@/UI/styles/MuiStyles";

const greyPalette: MinimalPalette["grey"] = createPaletteChannel({
  "50": "rgb(252, 253, 253)",
  "100": "rgb(249, 250, 251)",
  "200": "rgb(244, 246, 248)",
  "300": "rgb(223, 227, 232)",
  "400": "rgb(196, 205, 213)",
  "500": "rgb(145, 158, 171)",
  "600": "rgb(99, 115, 129)",
  "700": "rgb(69, 79, 91)",
  "800": "rgb(28, 37, 46)",
  "900": "rgb(20, 26, 33)",
});

export const minimalPalette: MinimalPalette = {
  primaryMain: createPaletteChannel({
    lighter: "rgb(200, 250, 214)",
    light: "rgb(91, 228, 155)",
    main: "rgb(0, 167, 111)",
    dark: "rgb(0, 120, 103)",
    darker: "rgb(0, 75, 80)",
    contrastText: "rgb(255, 255, 255)",
  }),
  primary: createPaletteChannel({
    lighter: "rgb(208, 236, 254)",
    light: "rgb(115, 186, 251)",
    main: "rgb(24, 119, 242)",
    dark: "rgb(12, 68, 174)",
    darker: "rgb(4, 33, 116)",
    contrastText: "rgb(255, 255, 255)",
  }),
  secondary: createPaletteChannel({
    lighter: "rgb(239, 214, 255)",
    light: "rgb(198, 132, 255)",
    main: "rgb(142, 51, 255)",
    dark: "rgb(81, 25, 183)",
    darker: "rgb(39, 9, 122)",
    contrastText: "rgb(255, 255, 255)",
  }),
  info: createPaletteChannel({
    lighter: "rgb(202, 253, 245)",
    light: "rgb(97, 243, 243)",
    main: "rgb(0, 184, 217)",
    dark: "rgb(0, 108, 156)",
    darker: "rgb(0, 55, 104)",
    contrastText: "rgb(255, 255, 255)",
  }),
  success: createPaletteChannel({
    lighter: "rgb(211, 252, 210)",
    light: "rgb(119, 237, 139)",
    main: "rgb(34, 197, 94)",
    dark: "rgb(17, 141, 87)",
    darker: "rgb(6, 94, 73)",
    contrastText: "rgb(255, 255, 255)",
  }),
  warning: createPaletteChannel({
    lighter: "rgb(255, 245, 204)",
    light: "rgb(255, 214, 102)",
    main: "rgb(255, 171, 0)",
    dark: "rgb(183, 110, 0)",
    darker: "rgb(122, 65, 0)",
    contrastText: "rgb(28, 37, 46)",
  }),
  error: createPaletteChannel({
    lighter: "rgb(255, 233, 213)",
    light: "rgb(255, 172, 130)",
    main: "rgb(255, 86, 48)",
    dark: "rgb(183, 29, 24)",
    darker: "rgb(122, 9, 22)",
    contrastText: "rgb(255, 255, 255)",
  }),
  grey: greyPalette,
  common: createPaletteChannel({
    black: "rgb(0, 0, 0)",
    white: "rgb(255, 255, 255)",
  }),
  divider: varAlpha(greyPalette["500Channel"], 0.2),
  text: {
    primary: greyPalette[800],
    secondary: greyPalette[600],
    disabled: greyPalette[500],
  },
  background: {
    paper: "rgb(255, 255, 255)",
    default: greyPalette[100],
    neutral: greyPalette[200],
  },
  shared: {
    inputUnderline: varAlpha(greyPalette["500Channel"], "32%"),
    inputOutlined: varAlpha(greyPalette["500Channel"], "20%"),
    paperOutlined: varAlpha(greyPalette["500Channel"], "16%"),
    buttonOutlined: varAlpha(greyPalette["500Channel"], "32%"),
  },
  baseAction: {
    active: greyPalette[600],
    hover: varAlpha(greyPalette["500Channel"], 0.08),
    selected: varAlpha(greyPalette["500Channel"], 0.16),
    focus: varAlpha(greyPalette["500Channel"], 0.24),
    disabledLight: varAlpha(greyPalette["500Channel"], 1),
    disabledDark: "rgb(99, 115, 129)",
    disabledBackground: varAlpha(greyPalette["500Channel"], "24%"),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
    borderRadius: 8,
    zIndex: 1050,
  },
};

type PaletteExtendColor = Record<PaletteColorExtend, string> &
  Record<`${PaletteColorExtend}Channel`, ColorChannel>;
export type MinimalPalette = {
  primaryMain: PaletteExtendColor;
  primary: PaletteExtendColor;
  secondary: PaletteExtendColor;
  info: PaletteExtendColor;
  success: PaletteExtendColor;
  warning: PaletteExtendColor;
  error: PaletteExtendColor;
  common: Pick<CommonColors, "black" | "white"> &
    Record<"blackChannel" | "whiteChannel", ColorChannel>;
  divider: string;
  grey: Record<PaletteGreyChennel, string> &
    Record<`${PaletteGreyChennel}Channel`, ColorChannel>;
  text: Record<PaletteText, string>;
  background: Record<PaletteBackground, string>;
  shared: PaletteShared;
  baseAction: PaletteBaseAction;
};

/**
 * Keys for the palette colors
 */
export type PaletteColorKey =
  | "primaryMain"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error";

/**
 * Extend for the palette values
 */
export type PaletteColorExtend =
  | "lighter"
  | "light"
  | "main"
  | "dark"
  | "darker"
  | "contrastText";

/**
 * palette Text
 */
export type PaletteText = "primary" | "secondary" | "disabled";

/**
 * palette Background
 */
export type PaletteBackground = "paper" | "default" | "neutral";

export type PaletteShared = {
  inputUnderline: string;
  inputOutlined: string;
  paperOutlined: string;
  buttonOutlined: string;
};

/**
 * palette baseAction
 */
export type PaletteBaseAction = {
  active: string;
  hover: string;
  selected: string;
  focus: string;
  disabledLight: string;
  disabledDark: string;
  disabledBackground: string;
  hoverOpacity: number;
  disabledOpacity: number;
  borderRadius: number;
  zIndex: number;
};

/**
 * GreyChennel for the palette grey colors
 */
export type PaletteGreyChennel =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

/**
 * Palette create shadows function
 */
export type PaletteCreateShadows =
  | "z1"
  | "z4"
  | "z8"
  | "z12"
  | "z16"
  | "z20"
  | "z24"
  | "card"
  | "dialog"
  | "dropdown";
