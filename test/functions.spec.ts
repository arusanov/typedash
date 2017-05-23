import * as functions from '../src/typedash'

describe('Functions test', () => {
  it('curry', () => {
    const sum = (a: number, b: number, c: number) => a + b + c
    const curried = functions.curry(sum)
    expect(curried(3)(5)(2)).toEqual(sum(3, 5, 2))
    expect(curried(3, 5)(2)).toEqual(sum(3, 5, 2))
    expect(curried(3)(5, 2)).toEqual(sum(3, 5, 2))
  })

  it('noop', () => {
    expect([1, 2, 3].forEach(functions.noop)).toBeUndefined()
  })

  it('once', () => {
    const fn = jest.fn()
      .mockReturnValueOnce('first')
      .mockReturnValue('others')
    const once = functions.once(fn)
    expect(once(1)).toEqual('first')
    expect(once(2)).toEqual('first')
    expect(once(3)).toEqual('first')
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(1)
  })

  describe('debounce', () => {
    beforeAll(() => jest.useFakeTimers())
    afterAll(() => jest.useRealTimers())

    it('at start', () => {
      const fn = jest.fn()
        .mockReturnValueOnce('first')
        .mockReturnValue('others')
      const debounced = functions.debounce(fn, 100, true)
      debounced(1)
      debounced(2)
      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenCalledWith(1)
      jest.runAllTimers()
      debounced(3)
      debounced(4)
      expect(fn).toHaveBeenCalledTimes(2)
      expect(fn).toHaveBeenLastCalledWith(3)
    })
    it('at end', () => {
      const fn = jest.fn()
        .mockReturnValueOnce('first')
        .mockReturnValue('others')
      const debounced = functions.debounce(fn, 100)
      debounced(1)
      debounced(2)
      expect(fn).toHaveBeenCalledTimes(0)
      jest.runAllTimers()
      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenCalledWith(2)
    })
  })

  it('memoize', () => {
    const fn = jest.fn((a: number, b: string): string => b + a)
    const memoized = functions.memoize(fn)

    const res = memoized(1, 'ddd')
    expect(res).toEqual(memoized(1, 'ddd'))
    expect(fn).toHaveBeenCalledTimes(1)
    const res1 = memoized(1, 'ddd2')
    expect(res1).toEqual(memoized(1, 'ddd2'))
    expect(fn).toHaveBeenCalledTimes(2)
  })
  describe('delayed', () => {
    beforeAll(() => jest.useFakeTimers())
    afterAll(() => jest.useRealTimers())

    it('delayed', () => {
      const fn = jest.fn()
      const scheduler = (fn: Function) => setTimeout(fn, 100)
      const delayed = functions.delayed(scheduler, fn)

      delayed(1)
      delayed(2)
      delayed(3)
      jest.runAllTimers()
      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenLastCalledWith(3)
    })
  })
})
