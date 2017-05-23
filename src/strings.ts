import {curry} from './functions'

const asciiWords = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g

export function words (str?: string): string[] {
  return str && str.match(asciiWords) || []
}

function mapWords (str: string, wordMapFn: (word: string, i: number) => string | undefined, join: string = ''): string {
  return words(str).map(wordMapFn).join(join)
}

export function lowerCase (s: string) {
  return s.toLowerCase()
}
function caseStr (casing: string, str: string): string {
  return mapWords(str, lowerCase, casing)
}

export const kebabCase = curry(caseStr)('-')
export const snakeCase = curry(caseStr)('_')

export function capitalize (str: string): string {
  return str[0].toUpperCase() + str.slice(1)
}

export function camelCase (str: string): string {
  return mapWords(str, (word, i) => {
    word = lowerCase(word)
    return i === 0 ? word : capitalize(word!)
  })
}

export function trim (str: string) {
  return str.trim()
}

export function wildcardToRegExp (wildcardPattern: string, flags?: string): RegExp {
  const regexMatch = /^\/(.+)\/([im]+)?$/.exec(wildcardPattern)
  if (regexMatch) {
    return new RegExp(regexMatch[1], regexMatch[2] || flags)
  }
  const pattern = wildcardPattern
    .replace(/[\-\[\]\/{}()?.\\^$|]/g, '\\$&')
    .replace(/\*/g, '.*?')
    .replace(/\+/g, '.+?')
  return new RegExp(`^${pattern}$`, flags)
}

export function template (template: string): (data: object) => string {
  const sanitized = template
    .split(/(\${[\s]*[^;\s{]+[\s]*})/g)
    .map(item => {
      const varMatch = /\${([\s]*[^;\s{]+[\s]*)}/.exec(item)
      return varMatch ? `($d.${varMatch[1]})` : `"${item.replace('"', '\\"')}"`
    })
  return Function('$d', `return ${sanitized.join('+')}`) as (data: object) => string
}
