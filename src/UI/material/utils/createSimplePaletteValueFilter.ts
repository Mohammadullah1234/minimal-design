import {
  PaletteColorOptions,
  SimplePaletteColorOptions,
} from "@/UI/styles/MuiStyles";

/**
 * Type guard to check if the object has a "main" property of type string.
 *
 * @param obj - the object to check
 * @returns boolean
 */
function hasCorrectMainProperty(obj: AdditionalPropertiesToCheck) {
  return typeof (obj as unknown as { main: string }).main === "string";
}
/**
 * Checks if the object conforms to the SimplePaletteColorOptions type.
 * The minimum requirement is that the object has a "main" property of type string, this is always checked.
 * Optionally, you can pass additional properties to check.
 *
 * @param obj - The object to check
 * @param additionalPropertiesToCheck - Array containing "light", "dark", and/or "contrastText"
 * @returns boolean
 */
function checkSimplePaletteColorValues(
  obj: AdditionalPropertiesToCheck,
  additionalPropertiesToCheck = []
) {
  if (!hasCorrectMainProperty(obj)) {
    return false;
  }
  for (const value of additionalPropertiesToCheck) {
    if (!obj.hasOwnProperty(value) || typeof obj[value] !== "string") {
      return false;
    }
  }
  return true;
}

type AdditionalPropertiesToCheck = (keyof Omit<
  SimplePaletteColorOptions,
  "main"
>)[];
/**
 * Creates a filter function used to filter simple palette color options.
 * The minimum requirement is that the object has a "main" property of type string, this is always checked.
 * Optionally, you can pass additional properties to check.
 *
 * @param additionalPropertiesToCheck - Array containing "light", "dark", and/or "contrastText"
 * @returns ([, value]: [any, PaletteColorOptions]) => boolean
 */
export default function createSimplePaletteValueFilter(
  additionalPropertiesToCheck?: AdditionalPropertiesToCheck
): ([, value]: [any, PaletteColorOptions]) => boolean {
  return ([, value]) =>
    value &&
    checkSimplePaletteColorValues(
      value as AdditionalPropertiesToCheck,
      additionalPropertiesToCheck as []
    );
}
