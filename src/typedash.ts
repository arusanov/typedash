export * from './arrays'
export * from './objects'
export * from './functions'
export * from './strings'
export * from './templates'

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
