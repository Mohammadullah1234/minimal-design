"use client";
import * as React from "react";
import { getStorage, removeStorage, setStorage } from "@/UI/utils/localStorage";

export type UseLocalStorageOptions = {
  initializeWithValue?: boolean;
};
export type UseLocalStorageProps<T> = {
  state: T;
  resetState: (defaultState?: T) => void;
  setState: (updateState: T | Partial<T>) => void;
  setField: (name: keyof T, updateValue: T[keyof T]) => void;
};

/**
 * Custom hook to manage state with local storage.
 *
 * @param {string} key - The key for the local storage.
 * @param {T} initialState - The initial state value.
 * @param {Object} [options] - Optional settings.
 * @param {boolean} [options.initializeWithValue=true] - Whether to initialize the local storage with the initial state value.
 *
 * @returns {UseLocalStorageProps<T>} - An object containing:
 * - `state`: The current state.
 * - `resetState`: A function to reset the state to the initial value and remove it from local storage.
 * - `setState`: A function to update the state and save it to local storage.
 * - `setField`: A function to update a specific field in the state and save it to local storage.
 *
 * @example
 * const { state, resetState, setState, setField } = useLocalStorage('settings', initialState);
 *
 * return (
 *   <div>
 *     <p>State: {JSON.stringify(state)}</p>
 *     <button onClick={() => setState({name: 'John', age: 20})}>Set State</button>
 *     <button onClick={() => setField('name', 'John')}>Set Name</button>
 *     <button onClick={resetState}>Reset</button>
 *   </div>
 * );
 */

export default function useLocalStorage<T>(
  key: string,
  initialState?: T,
  options?: UseLocalStorageOptions
): UseLocalStorageProps<T> {
  let { initializeWithValue: initialWidth = !0 } = options ?? {},
    isInitialState = initialState && typeof initialState == "object",
    [state, setState] = React.useState<T | undefined>(initialState);

  React.useEffect(() => {
    let gottenKey: T | undefined | null = getStorage(key);

    gottenKey
      ? setState(
          isInitialState ? (prev) => ({ ...prev, ...gottenKey }) : gottenKey
        )
      : initialState && initialWidth && setStorage(key, initialState);
  }, []);

  let setStateFn = React.useCallback(
      (updateState: T | Partial<T>) => {
        isInitialState
          ? setState((prev) => {
              let value = { ...prev, ...updateState };

              return (setStorage(key, value), value) as T | undefined;
            })
          : (setStorage(key, updateState),
            setState(updateState as React.SetStateAction<T | undefined>));
      },
      [key, isInitialState]
    ),
    setField = React.useCallback(
      (name: keyof T, updateValue: T[keyof T]) => {
        isInitialState && setStateFn({ [name]: updateValue } as T | Partial<T>);
      },
      [isInitialState, setStateFn]
    ),
    resetState = React.useCallback(
      (defaultState?: T) => {
        (setState(defaultState ?? initialState), removeStorage(key));
      },
      [initialState, key]
    );

  return React.useMemo(
    () => ({ state, setState: setStateFn, setField, resetState }),
    [resetState, setField, setStateFn, state]
  ) as UseLocalStorageProps<T>;
}
