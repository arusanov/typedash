import {templateObject} from '../src/strings'
import * as strings from '../src/typedash'

describe('Strings test', () => {
  it('words', () => {
    expect(strings.words('Foo Bar')).toEqual(['Foo', 'Bar'])
    expect(strings.words()).toEqual([])
    expect(strings.words(null)).toEqual([])
  })

  it('camelCase', () => {
    expect(strings.camelCase('Foo Bar')).toBe('fooBar')
    expect(strings.camelCase('--foo-bar--')).toBe('fooBar')
    expect(strings.camelCase('__FOO_BAR__')).toBe('fooBar')
  })

  it('snakeCase', () => {
    expect(strings.snakeCase('Foo Bar')).toBe('foo_bar')
    expect(strings.snakeCase('fooBar')).toBe('foo_bar')
    expect(strings.snakeCase('--foo-bar--')).toBe('foo_bar')
    expect(strings.snakeCase('__FOO_BAR__')).toBe('foo_bar')
  })

  it('kebabCase', () => {
    expect(strings.kebabCase('Foo Bar')).toBe('foo-bar')
    expect(strings.kebabCase('fooBar')).toBe('foo-bar')
    expect(strings.kebabCase('--foo-bar--')).toBe('foo-bar')
    expect(strings.kebabCase('__FOO_BAR__')).toBe('foo-bar')
  })

  it('capitalize', () => {
    expect(strings.capitalize('lowercase')).toBe('Lowercase')
  })

  it('trim', () => {
    expect(strings.trim('  trim  ')).toBe('trim')
    expect(strings.trim('  trim')).toBe('trim')
    expect(strings.trim('trim  ')).toBe('trim')
  })

  describe('wildcardToRegExp', () => {
    it('*', () => {
      const regex = strings.wildcardToRegExp('he*lo')
      expect(regex).toBeInstanceOf(RegExp)
      expect('helo').toMatch(regex)
      expect('hello').toMatch(regex)
      expect('helllllllo').toMatch(regex)
      expect('helllllllo2').not.toMatch(regex)
      expect('2helllllllo').not.toMatch(regex)
    })

    it('+', () => {
      const regex = strings.wildcardToRegExp('he+lo')
      expect(regex).toBeInstanceOf(RegExp)
      expect('helo').not.toMatch(regex)
      expect('hello').toMatch(regex)
      expect('helllllllo').toMatch(regex)
      expect('helllllllo2').not.toMatch(regex)
      expect('2helllllllo').not.toMatch(regex)
    })

    it('/regex/', () => {
      const regex = strings.wildcardToRegExp(`/^hel.o(me)?$/i`)
      expect(regex).toBeInstanceOf(RegExp)
      expect('helo').not.toMatch(regex)
      expect('hello').toMatch(regex)
      expect('helpo').toMatch(regex)
      expect('HELPO').toMatch(regex)
      expect('helpome').toMatch(regex)
      expect('helxo').toMatch(regex)
      expect('hel').not.toMatch(regex)
      expect('2hel').not.toMatch(regex)
    })

    it('/regex/ flags', () => {
      const regex = strings.wildcardToRegExp(`/^hel.o(me)?$/`)
      expect(regex).toBeInstanceOf(RegExp)
      expect('helo').not.toMatch(regex)
      expect('hello').toMatch(regex)
      expect('helpo').toMatch(regex)
      expect('HELPO').not.toMatch(regex)
      expect('helpome').toMatch(regex)
      expect('helxo').toMatch(regex)
      expect('hel').not.toMatch(regex)
      expect('2hel').not.toMatch(regex)
    })

  })

  it('template', () => {
    const tmpl = strings.template('Hel"lo ${boy}')
    expect(tmpl).toBeInstanceOf(Function)
    const tmpObj = templateObject({boy: 'John'})
    expect(tmpl(tmpObj)).toEqual(['Hel"lo ', 'John', ''])
    expect(tmpl(templateObject({bos: 'John'}, 'none'))).toEqual(['Hel"lo ', 'none', ''])
    const tmpl2 = strings.template('Hello, ${firstName} ${lastName}!!!')
    expect(tmpl2).toBeInstanceOf(Function)
    expect(tmpl2(templateObject({firstName: 'John', lastName: 'Doe'})).join('')).toBe('Hello, John Doe!!!')
    expect(tmpl2(templateObject({firstName: 'John', lastName: 2})).join('')).toBe('Hello, John 2!!!')
    expect(tmpl2(templateObject({firstName: 'John', lastName: null})).join('')).toBe('Hello, John !!!')
    expect(tmpl2(templateObject({firstName: 'John'})).join('')).toBe('Hello, John !!!')

    const tmpl3 = strings.template('Hello ${arg}')
    expect(tmpl3).toBeInstanceOf(Function)
    expect(tmpl3(() => 'Argh!').join('')).toBe('Hello Argh!')

  })
})
