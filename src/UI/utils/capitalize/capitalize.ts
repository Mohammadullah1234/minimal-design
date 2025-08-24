"use strict";

import { prefixClass } from "../generateUtilityClass";

/**
 * Convert a normal string to a capitalize string
 *
 * @param {string} string - String to convert.
 * @returns {string} Capitalized string.
 *
 * @example
 *
 * const text = "lorem ipsum dolor sit amet consectetur adipisicing elit."
 * console.log(capitalize(text))
 *
 * Output: "Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit."
 */
export default function capitalize(string: string): string {
  if (typeof string !== "string") {
    throw new Error(
      `${prefixClass}: "capitalize(${string})" expects a string argument.`
    );
  }

  const getWords = string?.split(" ");
  const result = getWords?.map(
    (elm) => elm?.charAt(0).toUpperCase() + elm.toLocaleLowerCase()?.slice(1)
  );

  return result?.join(" ");
}
