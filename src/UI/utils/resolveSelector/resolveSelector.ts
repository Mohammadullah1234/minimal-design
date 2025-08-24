"use strict";

/**
 * Resolves the selector if function it will take args and call directyly, otherwise it will be selector.
 *
 * @param selector - The selector, can be either selector or function.
 * @param args - The args forward to selector, if it's function.
 * @returns The resolved selector.
 */
export default function resolveSelector<TValue, TArgs extends any[]>(
  selector: ((...args: TArgs) => TValue) | TValue,
  ...args: TArgs
): TValue {
  return typeof selector === "function"
    ? (selector as (...args: TArgs) => TValue)(...args)
    : selector;
}
