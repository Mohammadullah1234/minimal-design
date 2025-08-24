"use strict";

/**
 * Retrieves a value from local storage by key.
 *
 * @param {string} key - The key of the item to retrieve.
 * @returns {any | null} - The parsed value of the item, or null if not found or an error occurs.
 *
 * @example
 * const user = getStorage('user');
 * console.log(user); // { name: 'John', age: 30 }
 */
export function getStorage<T>(key: string, defaultValue?: T): T | undefined {
  if (!localStorageAvailable()) return defaultValue ?? undefined;
  const getLocalItem = localStorage.getItem(key);

  if (getLocalItem !== "undefined") {
    if (getLocalItem)
      try {
        return JSON.parse(getLocalItem);
      } catch {
        return (getLocalItem ?? defaultValue ?? undefined) as T | undefined;
      }

    return defaultValue ?? undefined;
  }
}

/**
 * Sets a value in local storage with a specified key.
 *
 * @template T
 * @param {string} key - The key of the item to set.
 * @param {T} value - The value of the item to set.
 *
 * @example
 * setStorage('user', { name: 'John', age: 30 });
 */
export function setStorage<T>(key: string, value: T): void {
  try {
    const convertToJSON = JSON.stringify(value);
    window.localStorage.setItem(key, convertToJSON);
  } catch (err) {
    console.error("Error while setting storage:", err);
  }
}

/**
 * Removes an item from local storage by key.
 *
 * @param {string} key - The key of the item to remove.
 *
 * @example
 * removeStorage('user');
 */
export function removeStorage(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch (o) {
    console.error("Error while removing from storage:", o);
  }
}

/**
 * Checks if local storage is available.
 *
 * @returns {boolean} - True if local storage is available, false otherwise.
 *
 * @example
 * const isAvailable = localStorageAvailable();
 * console.log(isAvailable); // true or false
 */
export function localStorageAvailable(): boolean {
  try {
    const key = "__some_random_key_you_are_not_going_to_use__";
    return (
      window.localStorage.setItem(key, key),
      window.localStorage.removeItem(key),
      !0
    );
  } catch {
    return !1;
  }
}
