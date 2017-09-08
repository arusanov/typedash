import { concat, contains, forEach, isArray } from './arrays'
import { identity } from './functions'

/***
 * Get object keys from `item`
 * @param item The object to get keys from
 * @returns {string[]} Object keys
 */
export function keys<T extends object> (item: T): (keyof T)[] {
  return Object.keys(item) as (keyof T)[]
}

/***
 * Is object empty (no keys)
 * @param item The object to check
 * @returns {boolean}
 */
export function isEmpty (item?: Object | Array<any> | null): boolean {
  return !item || (isArray(item) && !item.length) || !keys(item).length
}

/***
 * Get object key values from `item`
 * @param item The object to get keys from
 * @returns {V[]} Object values
 */
export function values<V, T extends { [key: string]: V }> (item: T): V[] {
  return keys(item).reduce((res: V[], key) => concat(res, item[key]), [])
}

/***
 * Create new object with mapped key/value from `item`
 * @param item
 * @param mapKeyFn Function to map keys
 * @param mapValueFn Function to map values
 * @returns {[p:string]: V}
 */
export function mapKeyValues<V, T extends { [key: string]: V }, R> (item: T,
                                                                    mapKeyFn: (key: (keyof T)) => string,
                                                                    mapValueFn: (value: V) => R): { [key: string]: R } {
  return keys(item).reduce((res: { [key: string]: R }, key) => {
    res[mapKeyFn(key)] = mapValueFn(item[key])
    return res
  }, {})
}

/***
 * Create new object with mapped keys from `item`
 * @param item
 * @param mapKeyFn Function to map key
 * @returns {{[p: string]: V}}
 */
export function mapKeys<V, T extends { [key: string]: V }> (item: T, mapKeyFn: (key: (keyof T)) => string): { [key: string]: V } {
  return mapKeyValues<V, T, V>(item, mapKeyFn, identity)
}

/***
 * Create new object with mapped values from `item`
 * @param item
 * @param mapValueFn Function to map values
 * @returns {{[p: string]: R}}
 */
export function mapValues<R, V, T extends { [key: string]: V }> (item: T, mapValueFn: (value: V) => R): { [key: string]: R } {
  return mapKeyValues<V, T, R>(item, identity, mapValueFn)
}

/***
 * Reduce `item` keys and creates new object
 * @param item
 * @param reduceFn Reduce function
 * @returns {{[p: string]: any}}
 */
export function reduce<V, T extends { [key: string]: V }, R> (item: T,
                                                              reduceFn: (key: (keyof T), value: V) => R): { [key: string]: R } {
  return keys(item).reduce((res: { [key: string]: R }, key) => {
    res[key] = reduceFn(key, item[key])
    return res
  }, {})
}

/***
 * Filter `item` keys and create new object
 * @param item
 * @param filterFn
 * @returns {Partial<any>}
 */
export function filter<T extends object> (item: T,
                                          filterFn: (key: (keyof T)) => boolean): Partial<T> {
  return keys(item).reduce((res: Partial<T>, key) => {
    if (filterFn(key)) {
      res[key] = item[key]
    }
    return res
  }, {})
}

/***
 * Omit keys from `item` and return new object
 * @param item
 * @param keys The keys to exclude
 * @returns {Partial<T>}
 */
export function omit<T extends object> (item: T, keys: (keyof T | string)[]): Partial<T> {
  return filter(item, (key: (keyof T)) => !contains(keys, key))
}

/***
 * Pick keys from `item` and return new object
 * @param item
 * @param keys The keys to include
 * @returns {Partial<T>}
 */
export function pick<T extends object> (item: T, keys: (keyof T | string)[]): Partial<T> {
  return filter(item, (key: (keyof T)) => contains(keys, key))
}

const toString = Object.prototype.toString

function isMergeableObject<T> (val: T): boolean {
  return val && typeof val === 'object'
    && toString.call(val) !== '[object RegExp]'
    && toString.call(val) !== '[object Date]'
}

function emptyTarget<T> (val: T) {
  return isArray(val) ? [] : {}
}

function cloneIfNecessary<T extends object> (value: T): T {
  return (isMergeableObject(value)) ? merge(emptyTarget(value), value) as T : value
}

function arrayMerge<T extends Array<any>, S extends Array<any>> (target: T, source: S): Array<T | S> {
  const destination = target.slice()
  forEach(source, function (e, i) {
    if (typeof destination[i] === 'undefined') {
      destination[i] = cloneIfNecessary(e)
    } else if (isMergeableObject(e)) {
      destination[i] = merge(target[i], e)
    } else if (target.indexOf(e) === -1) {
      destination.push(cloneIfNecessary(e))
    }
  })
  return destination
}

function mergeObject<T extends Object, S extends Object> (target: T, source: S): T & S {
  const destination: any = {}
  if (isMergeableObject(target)) {
    forEach(keys(target), function (key) {
      destination[key] = cloneIfNecessary(target[key])
    })
  }
  forEach(keys(source), function (key: keyof T | keyof S) {
    if (!isMergeableObject(source[key as keyof S]) || !target[key as keyof T]) {
      destination[key] = cloneIfNecessary(source[key as keyof S])
    } else {
      destination[key] = merge(target[key as keyof T], source[key as keyof S])
    }
  })
  return destination
}

/***
 * This method is like Object.assign except that it recursively merges own and inherited enumerable string
 * keyed properties of source objects into the destination object.
 * Source properties that resolve to undefined are skipped if a destination value exists.
 * Array and plain object properties are merged recursively.
 * Other objects and value types are overridden by assignment.
 * Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 * @param target
 * @param source
 * @returns {object|Array}
 */
export function merge<T, S> (target: T, source: S): T & S | Array<T | S> {
  if (isArray(source)) {
    return isArray(target) ? arrayMerge(target, source) : cloneIfNecessary(source)
  } else {
    return mergeObject(target, source)
  }
}

/***
 * Creates a patch for `old` using values from `patch`
 * @example `patch({a:1,b:2}, {a:1,b:3,c:4}) === {b:3,c:4}`
 * @param old
 * @param patch
 * @returns {Partial<Partial<any>>}
 */
export function patch<T extends object> (old: T, patch: Partial<T>): Partial<T> {
  return filter(patch, (key) => patch[key] !== old[key])
}

/***
 * Check object keys equality
 * @param objA
 * @param objB
 * @returns {boolean}
 */
export function shallowEqual (objA: Object | null | undefined, objB: Object | null | undefined) {
  if (objA === objB) {
    return true
  }

  if (typeof objA !== 'object' || !objA ||
    typeof objB !== 'object' || !objB) {
    return false
  }

  const keysA = keys(objA)
  const keysB = keys(objB)
  if (keysA.length !== keysB.length) {
    return false
  }
  const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB)
  // Test for A's keys different from B.
  for (let idx = 0; idx < keysA.length; idx++) {
    const key = keysA[idx]
    if (!bHasOwnProperty(key)) {
      return false
    }
    const valueA = objA[key]
    const valueB = objB[key]
    if (valueA !== valueB) {
      return false
    }
  }
  return true
}
