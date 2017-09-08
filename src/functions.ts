import { argumentsArray, concat } from './arrays'
import { CurriedFunction1, CurriedFunction2, CurriedFunction3 } from './typedash'

/***
 * Creates a function that accepts arguments of func and either invokes func returning its result,
 * if at least arity number of arguments have been provided, or returns a function that accepts the remaining func arguments,
 * and so on. The arity of func may be specified if func.length is not sufficient.
 * @param fn
 * @param n
 */
export function curry<T1, TResult> (fn: (a: T1) => TResult, n?: number): CurriedFunction1<T1, TResult>
export function curry<T1, T2, TResult> (fn: (a: T1, b: T2) => TResult, n?: number): CurriedFunction2<T1, T2, TResult>
export function curry<T1, T2, T3, TResult> (fn: (a: T1, b: T2, c: T3) => TResult, n?: number): CurriedFunction3<T1, T2, T3, TResult>
export function curry (f: Function, n?: number): Function {
  const argsArray = argumentsArray(arguments)
  if (typeof n === 'undefined') {
    argsArray[1] = f.length
  }
  if (n === argsArray.length - 2) {
    return f.apply(undefined, argsArray.slice(2))
  }
  return function () {
    return curry.apply(undefined, concat(argsArray, argumentsArray(arguments)))
  }
}

/***
 * Function that do nothing
 */
/* tslint:disable-next-line no-empty */
export function noop () {

}

/***
 * Function for identity enumeration. Returns what passed to it
 * @param i
 * @returns {T}
 */
export function identity<T> (i: T) {
  return i
}

/***
 *Creates a debounced function that delays invoking func until after wait milliseconds have elapsed
 * since the last time the debounced function was invoked.
 * The func is invoked with the last arguments provided to the debounced function.
 * @param func
 * @param wait
 * @param immediate indicate whether func should be invoked on the leading and/or trailing edge of the wait timeout.
 * @returns {Function}
 */
export function debounce<T extends Function> (func: T, wait: number, immediate: boolean = false): T {
  let timeout: any
  return function (this: any) {
    const context = this
    const args = arguments
    const later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout!)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  } as any as T
}

/***
 * Creates a function that is restricted to invoking func once.
 * Repeat calls to the function return the value of the first invocation.
 * The func is invoked with the this binding and arguments of the created function.
 * @param func
 * @returns {T}
 */
export function once<T extends Function> (func: T): T {
  let called = false
  let res: any
  return function (this: any) {
    if (!called) {
      called = true
      res = func.apply(this, arguments)
    }
    return res
  } as any as T
}

/***
 * Creates a function that memoizes the result of func.
 * The func is invoked with the this binding of the memoized function.
 * @param func
 * @returns {T}
 */
export function memoize<T extends Function> (this: any, func: T): T {
  const stringifyJson = JSON.stringify
  const cache: { [key: string]: any } = {}

  return function (this: any): T {
    const hash = stringifyJson(arguments)
    return (hash in cache) ? cache[hash] : cache[hash] = func.apply(this, arguments)
  } as any as T
}

/***
 * Creates a delayed function that delays invoking func until called by schedulerFn.
 * The func is invoked with the last arguments provided to the delayed function.
 * @param schedulerFn
 * @param fn
 * @returns {T}
 */
export function delayed<T extends Function> (this: any, schedulerFn: (fn: Function) => void, fn: T): T {
  let ticking = false
  let ctx = this
  let lastArgs: any[] = []

  function handle () {
    fn.apply(ctx, lastArgs)
    ticking = false
  }

  return function (this: any, ...args: any[]) {
    if (!ticking) {
      schedulerFn(handle)
    }
    ticking = true
    lastArgs = args
    ctx = this
  } as any as T
}
