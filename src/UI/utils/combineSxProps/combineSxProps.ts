"use strict";
import { SxProps, Theme } from "@/UI/styles/MuiStyles";

export type CombineSxPropsParams =
  | SxProps<Theme>
  | ((theme: Theme) => SxProps)
  | ((theme: Theme) => SxProps<Theme>)
  | undefined;
/**
 *  Combines Multiple sx props.
 *
 * @param {CombineSxPropsParams | CombineSxPropsParams[] | null} ...sxProps - Define all `sx` props.
 * @returns Combined sx props array.
 *
 * @example
 *
 * const buttonStyles = { color: "red", background: "white" };
 * <Button sx={ combineSxProps(buttonStyles, props?.sx, other?.sx) }>Submit</Button>
 *
 * // Don't need to define like this:
 * sx={[ buttonStyles, ...Array.isArray(props?.sx) ? [props?.sx] : props?.sx ]});
 * //
 */
export default function combineSxProps(
  ...sxProps: (CombineSxPropsParams | CombineSxPropsParams[] | null)[]
): SxProps<Theme> {
  const result: CombineSxPropsParams[] = [];

  sxProps.forEach((prop) => {
    if (prop !== undefined)
      result.push(...(Array.isArray(prop) ? prop : [prop]));
  });

  return result as SxProps<Theme>;
}
