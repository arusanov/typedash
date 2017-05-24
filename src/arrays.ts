/***
 * Creates an array with all falsey values removed.
 * The values `false`, `null`, `0`, `""`, `undefined`, and `NaN` are falsey.
 * @param array array to compact.
 * @returns {T[]} Returns the new array of filtered values.
 */
export function compact<T> (array: T[]): T[] {
  return array.filter(i => i)
}

/***
 * Creates a new array concatenating array with any additional arrays and/or values.
 * @param item item or array to concatenate
 * @returns {T[]} Returns the new concatenated array.
 */
export function concat<T> (...item: (T | T[])[]): T[] {
  return ([] as T[]).concat(...item)
}

/***
 * Flattens array a single level deep.
 * @param array The array to flatten.
 * @returns {T[]} Return Flattened array.
 */
export function flatten<T> (array: (T|T[])[]): T[] {
  return [].concat.apply([], array)
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
  return array.filter((item, index, array) => array.indexOf(item) === index)
}

/***
 * Creates an array excluding all given values using `indexOf` for equality comparisons.
 * @param array The array to inspect.
 * @param remove The array to exclude.
 * @returns {T[]} Returns the new array of filtered values.
 */
export function without<T> (array: T[], remove: T[]): T[] {
  return array.filter((item) => !contains(remove, item))
}

/***
 * Check if item is in array using `indexOf`
 * @param array The array to inspect
 * @param item The item to check
 * @returns {boolean} Return `true` if item is in array
 */
export function contains<T> (array: T[], item: T): boolean {
  return array.indexOf(item) !== -1
}

/***
 * Creates an symmetric difference array of values not included in the other given arrays.
 * The order and references of result values are determined by the first array.
 * @param array1 The first array
 * @param array2 The second array
 * @returns {[T]} Returns values not included in the other given arrays.
 */
export function difference<T> (array1: T[], array2: T[]): T[] {
  return [...without(array1, array2), ...without(array2, array1)]
}

/***
 * Creates an array of values. If value from `toToggle` found in `existing` it gets removed,
 * otherwise it's added.
 * The order and references of result values are determined by the first array.
 * @param existing Existing elements array
 * @param toToggle Array of elements to toggle
 * @returns {[T]} Returns new array of toggled values
 */
export function toggle<T> (existing: T[], toToggle: T[]): T[] {
  return [...without(existing, toToggle), ...without(toToggle, existing)]
}
