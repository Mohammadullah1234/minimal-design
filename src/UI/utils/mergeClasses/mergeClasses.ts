"use strict";

export type ClassKey = string | false | undefined;
export type ClassString = ClassKey | ClassKey[] | null;
type StateProps = {
  [key: string]: boolean | undefined | [boolean, string];
};
/**
 * Merges class names with state-based class names.
 *
 * @param {ClassKey} className - The base class name(s).
 * @param {StateProps} state - The state object containing boolean or [boolean, string] pairs.
 * @returns {string} - The merged class names.
 *
 * @example
 *
 * const classNames = mergeClasses("item__base", {
 *   ["active__class"]: true,
 *   ["open__class"]: true,
 *   ["disabled__class"]: false,
 *   ["hover__class"]: undefined,
 * });
 *
 * console.log(classNames);
 * Output: "item__base active__class open__class"
 *
 * @example
 * const classNames = mergeClasses([
 *   "active__class",
 *   "open__class",
 *   "disabled__class",
 *   "hover__class",
 * ]);
 *
 * console.log(classNames);
 * Output: "active__class open__class disabled__class hover__class"
 */
export default function mergeClasses(
  className: ClassString,
  state?: StateProps
): string {
  let classes = className
      ? Array.isArray(className)
        ? className
        : [className]
      : [],
    other = state
      ? Object.entries(state)
          .filter(([_, r]) => r !== void 0 && r !== !1)
          .map(([t, r]) => (Array.isArray(r) ? (r[0] ? r[1] : "") : r ? t : ""))
          .filter(Boolean)
      : [];

  return [...classes.filter(Boolean), ...other].join(" ");
}
