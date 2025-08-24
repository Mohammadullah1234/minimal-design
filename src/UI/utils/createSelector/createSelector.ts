"use strict";

import {
  lruMemoize,
  createSelectorCreator,
  CreateSelectorFunction,
} from "reselect";
import fastObjectShallowCompare from "../fastObjectShallowCompare";

const reselectCreateSelector = createSelectorCreator({
  memoize: lruMemoize,
  memoizeOptions: {
    maxSize: 1,
    equalityCheck: Object.is,
  },
});
const cache = new WeakMap();

const arrayShallowCompare: (a: any, b: any) => boolean = (a, b) => {
  if (a === b) {
    return true;
  }
  return (
    a.length === b.length && a.every((v: any, i: string | number) => v === b[i])
  );
};

const objectShallowCompare = fastObjectShallowCompare;

export const argsEqual: (prev: any, curr: any) => boolean = (prev, curr) => {
  let fn = Object.is;
  if (curr instanceof Array) {
    fn = arrayShallowCompare;
  } else if (curr instanceof Object) {
    fn = objectShallowCompare;
  }
  return fn(prev, curr);
};

/**
 * Creates a memoized selector function.
 *
 * Method wrapping reselect's createSelector to provide caching instances.
 *
 * An instance of createSelector, customized with a given memoize implementation.
 */
const createSelector: CreateSelectorFunction = ((
  ...createSelectorArgs: [
    ...inputSelectors: any[],
    combiner: (...resultFuncArgs: any[]) => unknown,
  ]
) => {
  const selector = (state: { cacheKey: WeakKey }, selectorArgs: any) => {
    const cacheKey = state.cacheKey;
    const cacheArgsInit = cache.get(cacheKey);
    const cacheArgs = cacheArgsInit ?? new Map();
    const cacheFn = cacheArgs.get(createSelectorArgs);

    if (cacheArgs && cacheFn) {
      if (!argsEqual(cacheFn.selectorArgs, selectorArgs)) {
        const reselectArgs: [
          ...inputSelectors: any[],
          combiner: (...resultFuncArgs: any[]) => unknown,
        ] =
          selectorArgs !== undefined
            ? [
                ...createSelectorArgs.slice(0, createSelectorArgs.length - 1),
                () => selectorArgs,
                createSelectorArgs[createSelectorArgs.length - 1],
              ]
            : createSelectorArgs;

        const fn = reselectCreateSelector(...reselectArgs);
        (fn as unknown as { selectorArgs: any }).selectorArgs = selectorArgs;
        cacheArgs.set(createSelectorArgs, fn);

        return (fn as (state: unknown, args: any) => void)(state, selectorArgs);
      }
      return cacheFn(state, selectorArgs);
    }
    const reselectArgs =
      selectorArgs !== undefined
        ? [
            ...createSelectorArgs.slice(0, createSelectorArgs.length - 1),
            () => selectorArgs,
            createSelectorArgs[createSelectorArgs.length - 1],
          ]
        : createSelectorArgs;

    const fn = reselectCreateSelector(...(reselectArgs as any));

    (fn as unknown as { selectorArgs: any }).selectorArgs = selectorArgs;
    if (!cacheArgsInit) {
      cache.set(cacheKey, cacheArgs);
    }

    cacheArgs.set(createSelectorArgs, fn);
    return fn(state, selectorArgs);
  };

  return selector;
}) as unknown as CreateSelectorFunction;

export default createSelector;
