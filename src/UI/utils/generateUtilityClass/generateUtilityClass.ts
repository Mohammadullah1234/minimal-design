"use strict";

import capitalize from "../capitalize";

export const prefixClass = "RUI";
type ClassNameFormator = (key: string, value: string) => string;

export type FormatClass = "default" | ClassNameFormator;
export type GlobalStateSlot = keyof typeof globalStateClasses;
export const globalStateClasses = {
  active: "active",
  checked: "checked",
  completed: "completed",
  disabled: "disabled",
  error: "error",
  expanded: "expanded",
  focused: "focused",
  focusVisible: "focusVisible",
  open: "open",
  readOnly: "readOnly",
  required: "required",
  selected: "selected",
};

/**
 *  The Utility class generator.
 *
 * @param componentName - Defines the componentName.
 * @param slot - The slot of component.
 * @param formatClass - The formator of the `componentName`, `globalStatePrefix` and `slots` classes, can be either "default" or a function.
 * @param globalStatePrefix - Global Prefix state use for globalStateClasses.
 * @returns - (componentName + slot) | (globalStatePrefix + slot).
 *
 * @example
 *
 * const className = generateUtilityClass("Button", "root")
 * console.log(className) // "Button__root"
 *
 * @example
 *
 * const className = generateUtilityClass("Button", "active") // active is global state
 * console.log(className) // "Retmax__root"
 *
 * @example // formatClass
 *
 * const className = generateUtilityClass("Button", "root", (key, value) => `${key}-${value}`)
 * console.log(className) // "Button-root"
 */
export default function generateUtilityClass(
  componentName: string,
  slot: string,
  formatClass: FormatClass = "default",
  globalStatePrefix: string = capitalize(prefixClass)
): string {
  const format: FormatClass =
    formatClass === "default"
      ? (key, value) => `${key}__${value}`
      : formatClass;

  const globalStateClass =
    globalStateClasses[slot as keyof typeof globalStateClasses];

  return globalStateClass
    ? format(globalStatePrefix, globalStateClass)
    : format(componentName, slot);
}
export function isGlobalState(slot: string): boolean {
  return (
    globalStateClasses[slot as keyof typeof globalStateClasses] !== undefined
  );
}
