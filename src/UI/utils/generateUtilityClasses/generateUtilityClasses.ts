"use strict";

import capitalize from "../capitalize";
import generateUtilityClass, {
  FormatClass,
  prefixClass,
} from "../generateUtilityClass";

/**
 * The Utility classes generator of component.
 *
 * @param {string} componentName - Defines the componentName for each slot.
 * @param {T[]} slots - Defines the component slots.
 * @param {FormatClass} formatClass - The formator of the `componentName`, `globalStatePrefix` and `slots` classes, can be either "default" or a function.
 * @param {string} globalStatePrefix - Global Prefix state use for globalStateClasses.
 * @returns {Record<T, string>} - classes object.
 *
 * @example
 * const componentClasses = generateUtilityClasses<ComponentClassesKey>("Button", ["root", "item", "active" // active is global state
 * ]),
 *
 * console.log(componentClasses);
 * Output: { root: "Button__root", item: "Button__item", item: "Retmax__active" }
 *
 * @example // FormatClasses
 * const componentClasses = generateUtilityClasses<ComponentClassesKey>("Button", ["root", "item", "active" // active is global state
 * ], (key, value) => `${key}-${value}`),
 *
 * console.log(componentClasses);
 * Output: { root: "Button-root", item: "Button-item", item: "Retmax-active" }
 */
export default function generateUtilityClasses<T extends string>(
  componentName: string,
  slots: T[],
  formatClass: FormatClass = "default",
  globalStatePrefix: string = capitalize(prefixClass)
): Record<T, string> {
  const result = {} as Record<T, string>;

  slots?.forEach((slot) => {
    result[slot] = generateUtilityClass(
      componentName,
      slot,
      formatClass,
      globalStatePrefix
    );
  });

  return result;
}
