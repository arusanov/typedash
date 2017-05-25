import * as arrays from '../src/typedash'

describe('Arrays test', () => {
  it('compact', () => {
    expect(arrays.compact([null, 'foo', false, 'bar', undefined, 0])).toEqual(['foo', 'bar'])
  })

  it('concat', () => {
    expect(arrays.concat('foo')).toEqual(['foo'])
    expect(arrays.concat(['foo'])).toEqual(['foo'])
    expect(arrays.concat(['foo'], ['bar'])).toEqual(['foo', 'bar'])
    expect(arrays.concat(['foo'], 'bar')).toEqual(['foo', 'bar'])
  })

  it('flatten', () => {
    expect(arrays.flatten(['foo', ['bar']])).toEqual(['foo', 'bar'])
    expect(arrays.flatten(['foo', ['bar'], 'baz', ['foo']])).toEqual(['foo', 'bar', 'baz', 'foo'])
  })

  it('uniq', () => {
    expect(arrays.uniq(['foo', 'bar', 'bar', 'baz', 'bar', 'foo'])).toEqual(['foo', 'bar', 'baz'])
  })

  it('without', () => {
    expect(arrays.without(['foo', 'bar', 'bar', 'baz', 'bar', 'foo'], ['bar', 'baz']))
      .toEqual(['foo', 'foo'])
  })

  it('difference', () => {
    expect(arrays.difference(['foo', 'bar','bar', 'baz'], ['baz', 'bar', 'fox']))
      .toEqual(['foo', 'fox'])
  })
})
