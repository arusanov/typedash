export function compact<T> (array: T[]): T[] {
  return array.filter(i => i)
}

export function concat<T> (...item: (T | T[])[]): T[] {
  return ([] as T[]).concat(...item)
}

export function flatten<T> (array: T[] | T[][]): T[] {
  return [].concat.apply([], array)
}

export function uniq<T> (array: T[]): T[] {
  return array.filter((item, index, array) => array.indexOf(item) === index)
}

export function without<T> (array: T[], remove: T[]): T[] {
  return array.filter((item) => !contains(remove, item))
}

export function contains<T> (array: T[], item: T): boolean {
  return array.indexOf(item) !== -1
}

export function difference<T> (array1: T[], array2: T[]): T[] {
  return [...without(array1, array2), ...without(array2, array1)]
}

export function toggle<T> (existing: T[], toToggle: T[]): T[] {
  return [...without(existing, toToggle), ...without(toToggle, existing)]
}
