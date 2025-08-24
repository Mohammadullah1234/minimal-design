import generateUtilityClass from "@/UI/utils/generateUtilityClass";
import generateUtilityClasses from "@/UI/utils/generateUtilityClasses";
import { ComponentColors, componentColors } from "../styles";
import capitalize from "@/UI/utils/capitalize";

export interface SvgIconClasses
  extends Record<`color${Capitalize<ComponentColors>}`, string> {
  /** Styles applied to the root element if `fontSize="inherit"`. */
  fontSizeInherit: string;
  /** Styles applied to the root element if `fontSize="small"`. */
  fontSizeSmall: string;
  /** Styles applied to the root element if `fontSize="medium"`. */
  fontSizeMedium: string;
  /** Styles applied to the root element if `fontSize="large"`. */
  fontSizeLarge: string;
}
export type SvgIconClassKey = keyof SvgIconClasses;

export function getSvgIconUtilityClass(slot: string): string {
  return generateUtilityClass("MuiSvgIcon", slot);
}
const svgIconClasses: SvgIconClasses = generateUtilityClasses<SvgIconClassKey>(
  "MuiSvgIcon",
  [
    "root",
    ...componentColors.map((color) => `color${capitalize(color)}`),
    "fontSizeInherit",
    "fontSizeSmall",
    "fontSizeMedium",
    "fontSizeLarge",
  ] as SvgIconClassKey[]
);

export default svgIconClasses;
