import {compact, concat, contains, difference, flatten, toggle, uniq, without} from './arrays'
import {
  curry,
  debounce,
  delayed,
  identity,
  memoize,
  noop,
  once
} from './functions'
import {
  filter,
  isEmpty,
  keys,
  mapKeys,
  mapKeyValues,
  mapValues,
  merge,
  omit,
  patch,
  pick,
  reduce,
  shallowEqual,
  values
} from './objects'
import {
  camelCase,
  capitalize,
  kebabCase,
  lowerCase,
  snakeCase,
  template,
  trim,
  wildcardToRegExp,
  words
} from './strings'

export type CurriedFunction1<T1, R> = (v1: T1) => R

export interface CurriedFunction2<T1, T2, R> {
  (v1: T1): (v2: T2) => R
  (v1: T1, v2: T2): R
}
export interface CurriedFunction3<T1, T2, T3, R> {
  (v1: T1): CurriedFunction2<T2, T3, R>
  (v1: T1, v2: T2): (v3: T3) => R
  (v1: T1, v2: T2, v3: T3): R
}

export {
  // Functions
  curry,
  noop,
  identity,
  delayed,
  debounce,
  memoize,
  once,
  // Strings
  template,
  trim,
  capitalize,
  snakeCase,
  kebabCase,
  camelCase,
  lowerCase,
  words,
  wildcardToRegExp,
  // Arrays
  compact,
  concat,
  contains,
  toggle,
  without,
  difference,
  flatten,
  uniq,
  // Object
  shallowEqual,
  patch,
  filter,
  reduce,
  mapValues,
  mapKeyValues,
  mapKeys,
  merge,
  pick,
  omit,
  isEmpty,
  keys,
  values
}

export default {
  // Functions
  curry,
  noop,
  identity,
  delayed,
  debounce,
  memoize,
  once,
  // Strings
  template,
  trim,
  capitalize,
  snakeCase,
  kebabCase,
  camelCase,
  lowerCase,
  words,
  wildcardToRegExp,
  // Arrays
  compact,
  concat,
  contains,
  toggle,
  without,
  difference,
  flatten,
  uniq,
  // Object
  shallowEqual,
  patch,
  filter,
  reduce,
  mapValues,
  mapKeyValues,
  mapKeys,
  merge,
  pick,
  omit,
  isEmpty,
  keys,
  values
}
