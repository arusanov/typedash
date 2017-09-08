const objects = require('../src/typedash')

describe('Objects test', () => {
  it('isEmpty', () => {
    expect(objects.isEmpty({})).toBeTruthy()
    expect(objects.isEmpty()).toBeTruthy()
    expect(objects.isEmpty(null)).toBeTruthy()
    expect(objects.isEmpty(undefined)).toBeTruthy()
    expect(objects.isEmpty([])).toBeTruthy()
    expect(objects.isEmpty([1])).toBeFalsy()
    expect(objects.isEmpty({key: 1})).toBeFalsy()
  })

  it('keys', () => {
    expect(objects.keys({a: 1, b: 2})).toEqual(['a', 'b'])
  })

  it('values', () => {
    expect(objects.values({a: 1, b: 2})).toEqual([1, 2])
  })

  it('mapValues', () => {
    expect(objects.mapValues({
      a: 1,
      b: 2
    }, (val: number) => val + 1)).toEqual({a: 2, b: 3})
    expect(objects.mapValues({a: 'foo', b: 'bar'}, (val: string) => `${val}z`)).toEqual({a: 'fooz', b: 'barz'})
  })

  it('mapKeys', () => {
    expect(objects.mapKeys({a: 'foo', b: 'bar'}, (val: string) => `${val}z`)).toEqual({az: 'foo', bz: 'bar'})
  })

  it('reduce', () => {
    expect(objects.reduce({a: 'foo', b: 'bar'}, (key: string, val: string) => `${key}${val}`)).toEqual({
      a: 'afoo',
      b: 'bbar'
    })
  })

  it('filter', () => {
    expect(objects.filter({a: 'foo', b: 'bar'}, (key: string) => key !== 'a')).toEqual({b: 'bar'})
  })

  it('omit', () => {
    expect(objects.omit({a: 'foo', b: 'bar'}, ['a'])).toEqual({b: 'bar'})
  })

  it('pick', () => {
    expect(objects.pick({a: 'foo', b: 'bar'}, ['b'])).toEqual({b: 'bar'})
  })

  it('patch', () => {
    expect(objects.patch({a: 'foo', b: 'bar'}, {a: 'foo', b: 'baz'})).toEqual({b: 'baz'})
  })

  describe('merge', () => {
    it('immutable', () => {
      const src = {key1: 'value1', key2: 'value2'}
      const target = {}

      const res = objects.merge(target, src)

      expect(target).toEqual({})
      expect(res).toEqual(src)
    })

    it('simple', () => {
      const src = {key1: 'changed', key2: 'value2'}
      const target = {key1: 'value1', key3: 'value3'}

      const expected = {
        key1: 'changed',
        key2: 'value2',
        key3: 'value3'
      }

      expect(expected).toEqual(objects.merge(target, src))
    })

    it('nested objects into target', () => {
      const src = {
        key1: {
          subkey1: 'changed',
          subkey3: 'added'
        }
      }
      const target = {
        key1: {
          subkey1: 'value1',
          subkey2: 'value2'
        }
      }

      const expected = {
        key1: {
          subkey1: 'changed',
          subkey2: 'value2',
          subkey3: 'added'
        }
      }

      expect(expected).toEqual(objects.merge(target, src))
    })

    it('replace simple key with nested object in target', () => {
      const src = {
        key1: {
          subkey1: 'subvalue1',
          subkey2: 'subvalue2'
        }
      }
      const target = {
        key1: 'value1',
        key2: 'value2'
      }

      const expected = {
        key1: {
          subkey1: 'subvalue1',
          subkey2: 'subvalue2'
        },
        key2: 'value2'
      }

      expect(expected).toEqual(objects.merge(target, src))
    })

    it('should add nested object in target', () => {
      const src = {
        'b': {
          'c': {}
        }
      }

      const target = {
        'a': {}
      }

      const expected = {
        'a': {},
        'b': {
          'c': {}
        }
      }

      expect(expected).toEqual(objects.merge(target, src))
    })

    it('should merge two arrays', () => {
      const src = ['one', 'three']
      const target = ['one', 'two']

      const expected = ['one', 'two', 'three']

      expect(expected).toEqual(objects.merge(target, src))
    })

    it('should work on another simple array', () => {
      const target = ['a1', 'a2', 'c1', 'f1', 'p1']
      const src = ['t1', 's1', 'c2', 'r1', 'p2', 'p3']

      const expected = ['a1', 'a2', 'c1', 'f1', 'p1', 't1', 's1', 'c2', 'r1', 'p2', 'p3']
      expect(target).toEqual(['a1', 'a2', 'c1', 'f1', 'p1'])
      expect(expected).toEqual(objects.merge(target, src))
    })

    it('should work on array properties', () => {
      const src = {
        key1: ['one', 'three'],
        key2: ['four']
      }
      const target = {
        key1: ['one', 'two']
      }

      const expected = {
        key1: ['one', 'two', 'three'],
        key2: ['four']
      }

      expect(expected).toEqual(objects.merge(target, src))
    })

    it('should work on array', () => {
      const target = {
        key1: ['one', 'three'],
        key2: ['four']
      }
      const src = ['one', 'two']

      const expected = ['one', 'two']

      expect(objects.merge(target, src)).toEqual(expected)
    })

    it('should work on objects in array', () => {
      const src = {
        key1: [{two: 1}]
      }
      const target = {
        key1: [{one: 1}]
      }

      const expected = {'key1': [{'one': 1, 'two': 1}]}

      expect(objects.merge(target, src)).toEqual(expected)
    })

  })

  describe('shallowEqual', () => {
    const shallowequal = objects.shallowEqual

    it('returns false if either argument is null', () => {
      expect(shallowequal(null, {})).toEqual(false)
      expect(shallowequal({}, null)).toEqual(false)
    })

    it('returns true if both arguments are null or undefined', () => {
      expect(shallowequal(null, null)).toEqual(true)
      expect(shallowequal(undefined, undefined)).toEqual(true)
    })

    it('returns true if arguments are shallow equal', () => {
      expect(
        shallowequal(
          {a: 1, b: 2, c: 3},
          {a: 1, b: 2, c: 3}
        )
      ).toEqual(true)
    })

    it('returns false if arguments are not objects and not equal', () => {
      expect(
        shallowequal(
          1,
          2
        )
      ).toEqual(false)
    })

    it('returns false if only one argument is not an object', () => {
      expect(
        shallowequal(
          1,
          {}
        )
      ).toEqual(false)
    })

    it('returns false if first argument has too many keys', () => {
      expect(
        shallowequal(
          {a: 1, b: 2, c: 3},
          {a: 1, b: 2}
        )
      ).toEqual(false)
    })

    it('returns false if second argument has too many keys', () => {
      expect(
        shallowequal(
          {a: 1, b: 2},
          {a: 1, b: 2, c: 3}
        )
      ).toEqual(false)
    })

    it('returns false if second argument has different keys', () => {
      expect(
        shallowequal(
          {a: 1, b: 2, d: 3},
          {a: 1, b: 2, c: 3}
        )
      ).toEqual(false)
    })

    it('returns true if values are not primitives but are ===', () => {
      let obj = {}
      expect(
        shallowequal(
          {a: 1, b: 2, c: obj},
          {a: 1, b: 2, c: obj}
        )
      ).toEqual(true)
    })

    // subsequent test cases are copied from lodash tests
    it('returns false if arguments are not shallow equal', () => {
      expect(
        shallowequal(
          {a: 1, b: 2, c: {}},
          {a: 1, b: 2, c: {}}
        )
      ).toEqual(false)
    })

    it('should treat objects created by `Object.create(null)` like any other plain object', () => {
      class Foo {a = 1}

      const object2 = {'a': 1}
      expect(shallowequal(new Foo(), object2)).toEqual(true)

      const object1 = Object.create(null)
      object1.a = 1
      expect(shallowequal(object1, object2)).toEqual(true)
    })
  })
})
