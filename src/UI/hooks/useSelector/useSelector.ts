"use client";
import { useSyncExternalStoreWithSelector } from "use-sync-external-store/with-selector";

type DefaultStore = {
  subscribe: (fn: () => void) => () => void;
  getSnapshot: () => any;
  state: any;
};
type Selector<TState, TArgs, TResult> = (state: TState, args: TArgs) => TResult;

const defaultCompare = Object.is;

/**
 * Custome hook use for external stores to access the data from store.
 *
 * @param store - The store to select.
 * @param selector - The selector function.
 * @param args - The arguments to pass.
 * @param equals - The equals compare.
 * @returns The value from the store state.
 */
const useSelector = <Store extends DefaultStore, TArgs, TValue>(
  store: Store,
  selector: Selector<Store["state"], TArgs, TValue>,
  args: TArgs = undefined as TArgs,
  equals: (a: TValue, b: TValue) => boolean = defaultCompare
): TValue => {
  const selectorWithArgs = (state: Store["state"]) =>
    (selector as (state: any, args: TArgs) => void)(state, args);

  return useSyncExternalStoreWithSelector(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot,
    selectorWithArgs,
    equals
  );
};

export default useSelector;
