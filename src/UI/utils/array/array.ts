"use strict";

type ItemComparer<Item> = (a: Item, b: Item) => boolean;

/**
 * Compare two arrays
 *
 * @param array1 - Array 1.
 * @param array2 - Array 2 to Equal.
 * @param itemComparer - Optional itemComparer of arrays.
 * @returns Returns `true` if arrays are equal; otherwise, `false`.
 *
 * @example
 *
 * const array1 = ["apple", "mango"];
 * const array2 = ["apples", "mango"];
 *
 * console.log(areArraysEqual(array1, array2)) // false
 */
export function areArraysEqual<Item>(
  array1: ReadonlyArray<Item>,
  array2: ReadonlyArray<Item>,
  itemComparer: ItemComparer<Item> = (a, b) => a === b
): boolean {
  return (
    array1.length === array2.length &&
    array1.every((value, index) => itemComparer(value, array2[index]))
  );
}

//----------------------------------------------------------------

/**
 * Sum multiple arrays of numbers.
 *
 * @param {number[][]} ...arrays - Define Arrays of numbers
 * @returns {number} Sum of all numbers arrays
 *
 * @example
 *
 * const sum = sumNumbersArrays([4, 10, 5, 1])
 * console.log(sum) // 20
 *
 * @example - Muliple arrays
 *
 * const array1 = [4, 10, 5, 1];
 * const array2 = [3.38, 6, 2.57];
 *
 * const sum = sumNumbersArrays(array1, array2)
 * console.log(sum) // 30.77
 */
export function sumNumbersArrays(...arrays: number[][]): number {
  const sumNumbers = (array: number[]) =>
    array.reduce((cur: number, tot: number) => cur + tot, 0);

  const sumArraysNumbers = arrays.map((elm: number[]) => sumNumbers(elm));
  const total =
    arrays.length === 1 ? sumNumbers(arrays[0]) : sumNumbers(sumArraysNumbers);

  return Number(total.toFixed(2));
}

// sort array ---------------------------------------------------------

export type SortArrayOrder = "asc" | "desc";

export interface SortArrayOptions<T> {
  order?: SortArrayOrder;
  orderBy?: keyof T;
  localeCompare?: boolean;
  compareFn?: (a: T, b: T) => 0 | 1 | -1;
}

/**
 * The compareSortValues use to Compare Sort Values
 *
 * @param valA - Sort Param `a`.
 * @param valB - Sort Param `b`.
 * @param locale - Use for the `localeCompare` of sort values.
 *
 * @returns Sort number
 *
 * @example
 *
 * const order = "asc";
 *
 * array.sort((a, b) => {
 *   const result = compareSortValues<T>(a, b, true);
 *   return order === "asc" ? result : -result;
 * });
 */
export function compareSortValues<T>(
  valA: T,
  valB: T,
  locale: boolean = true
): number {
  if (valA === valB) return 0;
  if (valA === undefined || valA === null) return 1;
  if (valB === undefined || valB === null) return -1;

  if (typeof valA === "string" && typeof valB === "string") {
    return locale ? valA.localeCompare(valB) : valA > valB ? 1 : -1;
  }

  return valA > valB ? 1 : -1;
}

/**
 * Sort array method use to sort diffrent kinds of arrays.
 *
 * @param {T[]} array - Define array to sort.
 * @param options - Sort array options: `order`, `orderBy`, `localeCompare`, `compareFn`.
 * @returns Sorted array.
 *
 * @example // number array
 *
 * const array = [4, 3, 5, 1, 2];
 * console.log(sortArray(array, { order: "asc" }));
 * Output: [1, 2, 3, 4, 5]
 *
 * @example // string array
 * const array = ["Lucian Obrien", "Jayvion Simon", "Ariana Lang"];
 * console.log(sortArray(array, { order: "desc" }));
 * Output: ['Lucian Obrien', 'Jayvion Simon', 'Ariana Lang']
 *
 * @example // boolean array
 * const array = [true, false, false, true];
 * console.log(sortArray(array, { order: "desc" }));
 * Output: [true, true, false, false]
 *
 * @example // Advanced Sorting
 *
 * const array: Students[] = [
 *    { id: 2, student: "Lucian Obrien" },
 *    { id: 3, student: "Jayvion Simon" },
 *    { id: 1, student: "Deja Barady" },
 *    { id: 5, student: "Ariana Lang" },
 *    { id: 4, student: "Harrison Stein" },
 * ];
 *
 * console.log(sortArray(array, { order: "asc", orderBy: "id" }));
 * Output: [
 *    { id: 1, student: "Deja Barady" },
 *    { id: 2, student: "Lucian Obrien" },
 *    { id: 3, student: "Jayvion Simon" },
 *    { id: 4, student: "Harrison Stein" },
 *    { id: 5, student: "Ariana Lang" },
 * ];
 *
 * // Note: you can use `localeCompare` or `compareFn` in sortArray options.
 * @example
 *
 * sortArray(array, {
 *   order: "asc",
 *   orderBy: "id",
 *   localeCompare: false,
 *   compareFn: (a, b) => (a > b ? 1 : -1)
 * })
 */
export function sortArray<T>(
  array: T[],
  options?: T extends Array<any>
    ? Omit<SortArrayOptions<T>, "orderBy">
    : T extends object
      ? SortArrayOptions<T>
      : { order?: SortArrayOrder }
): T[] {
  const {
    order = "asc",
    orderBy,
    localeCompare = true,
    compareFn,
  } = (options || {}) as SortArrayOptions<T>;

  if (compareFn) {
    return [...array].sort((a, b) =>
      order === "asc" ? compareFn(a, b) : compareFn(b, a)
    );
  }

  return [...array].sort((a, b) => {
    let valA: T = a;
    let valB: T = b;

    if ((typeof a === "object" || a !== null) && orderBy) {
      valA = (a as any)[orderBy];
      valB = (b as any)[orderBy];
    }

    const result = compareSortValues<T>(valA, valB, localeCompare);
    return order === "asc" ? result : -result;
  });
}
