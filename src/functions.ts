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

function curry<T1, TResult> (fn: (a: T1) => TResult, n?: number): CurriedFunction1<T1, TResult>
function curry<T1, T2, TResult> (fn: (a: T1, b: T2) => TResult, n?: number): CurriedFunction2<T1, T2, TResult>
function curry<T1, T2, T3, TResult> (fn: (a: T1, b: T2, c: T3) => TResult, n?: number): CurriedFunction3<T1, T2, T3, TResult>
function curry (f: Function, n?: number): Function {
  const args = argsArray(arguments)
  if (typeof n === 'undefined') {
    args[1] = f.length
  }
  if (n === args.length - 2) {
    return f.apply(undefined, args.slice(2))
  }
  return function () {
    return curry.apply(undefined, args.concat(argsArray(arguments)))
  }
}

function argsArray (argsObject: IArguments): any[] {
  return Array.prototype.slice.call(argsObject, 0)
}

/* tslint:disable-next-line no-empty */
export function noop () {

}

export function identity<T> (i: T) {
  return i
}

export {curry}

export function debounce<T extends Function> (func: T, wait: number, immediate: boolean = false): T {
  let timeout: number | null
  return function (this: any) {
    const context = this
    const args = arguments
    const later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout!)
    timeout = window.setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  } as any as T
}

export function once<T extends Function> (f: T): T {
  let called = false
  let res: any
  return function (this: any) {
    if (!called) {
      called = true
      res = f.apply(this, arguments)
    }
    return res
  } as any as T
}

export function memoize<T extends Function> (this: any, func: T): T {
  const stringifyJson = JSON.stringify
  const cache: { [key: string]: any } = {}

  return function (this: any): T {
    const hash = stringifyJson(arguments)
    return (hash in cache) ? cache[hash] : cache[hash] = func.apply(this, arguments)
  } as any as T
}

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
