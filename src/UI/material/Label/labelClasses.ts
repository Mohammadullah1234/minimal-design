import generateUtilityClass from "@/UI/utils/generateUtilityClass";
import generateUtilityClasses from "@/UI/utils/generateUtilityClasses";

export interface LabelClasses {
  /**
   * Styles applied to the `root` element.
   */
  root: string;
  /**
   * Styles applied on both icons, `startIcon` and `endIcon`.
   */
  icon: string;
  /**
   * Styles applied to the `startIcon` element.
   */
  startIcon: string;
  /**
   * Styles applied to the `endIcon` element.
   */
  endIcon: string;
}

export type LabelClassKey = keyof LabelClasses;

export function getLabelUtilityClass(slot: string) {
  return generateUtilityClass("RuiLabel", slot);
}

const labelClasses: LabelClasses = generateUtilityClasses<LabelClassKey>(
  "RuiLabel",
  ["root", "icon", "startIcon", "endIcon"]
);

export default labelClasses;
