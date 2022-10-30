import fake from './index'

describe('Entry point for fake data', () => {
  it.each([
    [fake.bool, []],
    [fake.int, []],
    [fake.number, []],
    [fake.string, []],
    [fake.array, [1, () => 1]],
    [fake.object, []],
    [fake.select, [[1, 2]]],
  ])('Has correct interface for %s', (fn, args) => {
    expect(typeof fn).toBe('function')
    expect(() => fn.apply(null, args)).not.toThrowError()
  })

  it.each([
    [fake.int.with, []],
    [fake.number.with, []],
    [fake.string.with, []],
    [fake.array.with, [{ length: 1, fn: () => 1 }]],
    [fake.object.with, []],
    [fake.select.with, [[1, 2]]],
  ])('Has correct interface for %s.with', (fn, args) => {
    expect(typeof fn).toBe('function')
    const alias = fn.apply(null, args)
    expect(alias).not.toThrowError()
  })

  it('Generates a fake boolean value', () => {
    expect(`${fake.bool()}`).toMatch(/true|false/)
  })

  it('Generates a fake integer', () => {
    expect(`${fake.int()}`).toMatch(/\d+/)
  })

  it('Generates a fake floating point number', () => {
    expect(`${fake.number()}`).toMatch(/\d+\.\d+/)
  })

  it('Generates a fake string', () => {
    expect(fake.string()).toMatch(/[a-zA-Z]+/)
  })

  it('Generates a fake array', () => {
    const arr = fake.array(3, fake.int)
    expect(Array.isArray(arr)).toBe(true)
    expect(arr).toHaveLength(3)
  })

  it('Generates a fake object', () => {
    const obj = fake.object({
      key: fake.array(2, () => 2),
    })
    expect(obj).toMatchObject({ key: [2, 2]})
  })
})