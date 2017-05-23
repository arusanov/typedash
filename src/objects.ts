import {identity} from './functions'
import {contains} from './arrays'
export function keys<T extends object> (item: T): (keyof T)[] {
  return Object.keys(item) as (keyof T)[]
}

export function isEmpty (item?: Object | Array<any>): boolean {
  return !item || (Array.isArray(item) && !item.length) || !keys(item).length
}

export function values<V, T extends { [key: string]: V }> (item: T): V[] {
  return keys(item).reduce((res: V[], key) => res.concat(item[key]), [])
}

export function mapKeyValues<V, T extends { [key: string]: V }, R> (item: T,
                                                                    mapKeyFn: (key: (keyof T)) => string,
                                                                    mapValueFn: (value: V) => R): { [key: string]: R } {
  return keys(item).reduce((res: { [key: string]: R }, key) => {
    res[mapKeyFn(key)] = mapValueFn(item[key])
    return res
  }, {})
}

export function mapKeys<V, T extends { [key: string]: V }> (item: T, mapKeyFn: (key: (keyof T)) => string): { [key: string]: V } {
  return mapKeyValues<V, T, V>(item, mapKeyFn, identity)
}

export function mapValues<V, T extends { [key: string]: V }, R> (item: T, mapValueFn: <R>(value: V) => R): { [key: string]: R } {
  return mapKeyValues<V, T, R>(item, identity, mapValueFn)
}

export function reduce<V, T extends { [key: string]: V }, R> (item: T,
                                                              reduceFn: (key: (keyof T), value: V) => R): { [key: string]: R } {
  return keys(item).reduce((res: { [key: string]: R }, key) => {
    res[key] = reduceFn(key, item[key])
    return res
  }, {})
}

export function filter<T extends object> (item: T,
                                          filterFn: (key: (keyof T)) => boolean): Partial<T> {
  return keys(item).reduce((res: Partial<T>, key) => {
    if (filterFn(key)) {
      res[key] = item[key]
    }
    return res
  }, {})
}

export function omit<T extends object> (item: T, keys: (keyof T)[]): Partial<T> {
  return filter(item, (key: (keyof T)) => !contains(keys, key))
}

export function pick<T extends object> (item: T, keys: (keyof T)[]): Partial<T> {
  return filter(item, (key: (keyof T)) => contains(keys, key))
}

function isMergeableObject<T> (val: T): boolean {
  return val && typeof val === 'object'
    && Object.prototype.toString.call(val) !== '[object RegExp]'
    && Object.prototype.toString.call(val) !== '[object Date]'
}

function emptyTarget<T> (val: T) {
  return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary<T extends object> (value: T): T {
  return (isMergeableObject(value)) ? merge(emptyTarget(value), value) as T : value
}

function arrayMerge<T extends Array<any>, S extends Array<any>> (target: T, source: S): Array<T | S> {
  const destination = target.slice()
  source.forEach(function (e, i) {
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
    keys(target).forEach(function (key) {
      destination[key] = cloneIfNecessary(target[key])
    })
  }
  keys(source).forEach(function (key: keyof T | keyof S) {
    if (!isMergeableObject(source[key as keyof S]) || !target[key as keyof T]) {
      destination[key] = cloneIfNecessary(source[key as keyof S])
    } else {
      destination[key] = merge(target[key as keyof T], source[key as keyof S])
    }
  })
  return destination
}

export function merge<T, S> (target: T, source: S): T & S | Array<T | S> {
  if (Array.isArray(source)) {
    return Array.isArray(target) ? arrayMerge(target, source) : cloneIfNecessary(source)
  } else {
    return mergeObject(target, source)
  }
}

export function patch<T extends object> (old: T, patch: Partial<T>): Partial<T> {
  return filter(patch, (key) => patch[key] !== old[key])
}

export function shallowEqual (objA: Object, objB: Object) {
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
