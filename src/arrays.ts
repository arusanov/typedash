import { identity } from './functions'

const arrayPrototype = Array.prototype
/***
 * Filter items by predicate
 * @param array
 * @param callbackfn
 * @returns {T[]}
 */
function filter<T> (array: T[], callbackfn: (this: void, value: T, index: number, array: T[]) => any): T[] {
  return array.filter(callbackfn)
}

/***
 * Iterate over array with `callbackfn`
 * @param array
 * @param callbackfn
 * @returns {T[]}
 */
export function forEach<T> (array: T[], callbackfn: (this: void, value: T, index: number, array: T[]) => any): T[] {
  array.forEach(callbackfn)
  return array
}

/***
 * Get index of item in array
 * @param array
 * @param item
 * @returns {number} -1 if item is not found
 */
export function indexOf<T> (array: T[], item: T): number {
  return array.indexOf(item)
}

/***
 * Creates an array with all falsey values removed.
 * The values `false`, `null`, `0`, `""`, `undefined`, and `NaN` are falsey.
 * @param array array to compact.
 * @returns {T[]} Returns the new array of filtered values.
 */
export function compact<T> (array: (T | null | undefined)[]): T[] {
  return filter(array, identity) as T[]
}

/***
 * Return array from arguments
 * @param argsObject
 * @returns {any[]}
 */
export function argumentsArray<T> (argsObject: IArguments): T[] {
  return arrayPrototype.slice.call(argsObject, 0)
}

/***
 * Creates a new array concatenating array with any additional arrays and/or values.
 * @param item item or array to concatenate
 * @returns {T[]} Returns the new concatenated array.
 */
export function concat<T> (...item: (T | T[])[]): T[] {
  return arrayPrototype.concat.apply([], item)
}

/***
 * Flattens array a single level deep.
 * @param array The array to flatten.
 * @returns {T[]} Return Flattened array.
 */
export function flatten<T> (array: (T | T[])[]): T[] {
  return concat([], ...array)
}

/***
 * Creates a duplicate-free version of an array,
 * using `indexOf` for equality comparisons,
 * in which only the first occurrence of each element is kept.
 * The order of result values is determined by the order they occur in the array.
 * @param array The array to inspect.
 * @returns {T[]} Duplicate free array
 */
export function uniq<T> (array: T[]): T[] {
  return filter(array, (item, index, array) => indexOf(array, item) === index)
}

/***
 * Creates an array excluding all given values using `indexOf` for equality comparisons.
 * @param array The array to inspect.
 * @param remove The array to exclude.
 * @returns {T[]} Returns the new array of filtered values.
 */
export function without<T> (array: T[], remove: T[]): T[] {
  return filter(array, (item) => !contains(remove, item))
}

/***
 * Check if item is in array using `indexOf`
 * @param array The array to inspect
 * @param item The item to check
 * @returns {boolean} Return `true` if item is in array
 */
export function contains<T> (array: T[], item: T): boolean {
  return indexOf(array, item) !== -1
}

/***
 * Creates an symmetric difference array of values not included in the other given arrays.
 * The order and references of result values are determined by the first array.
 * @param array1 The first array
 * @param array2 The second array
 * @returns {[T]} Returns values not included in the other given arrays.
 */
export function difference<T> (array1: T[], array2: T[]): T[] {
  return concat(without(array1, array2), without(array2, array1))
}

/***
 * Check if argument is an array
 * @param item
 * @returns {boolean}
 */
export function isArray<T> (item: T | T[]): item is Array<T> {
  return Array.isArray(item)
}
