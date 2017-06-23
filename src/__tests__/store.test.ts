import { sum } from '../store'

test('sum', () => {
  expect(sum(1, 2)).toBe(3)
})
