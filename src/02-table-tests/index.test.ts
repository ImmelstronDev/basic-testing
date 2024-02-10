// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 6, action: Action.Subtract, expected: -3 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 3, b: 3, action: Action.Multiply, expected: 9 },
  { a: 15, b: 3, action: Action.Divide, expected: 5 },
  { a: 30, b: 3, action: Action.Divide, expected: 10 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 2, b: 8, action: Action.Exponentiate, expected: 256 },
  { a: 2, b: 8, action: '=', expected: null },
  { a: 2, b: 8, action: '++', expected: null },
  { a: 2, b: 8, action: '--', expected: null },
  { a: 2, b: 8, action: '*^', expected: null },
  { a: 2, b: 8, action: '//', expected: null },
  { a: '2', b: 8, action: Action.Exponentiate, expected: null },
  { a: 2, b: '8', action: Action.Exponentiate, expected: null },
  { a: '2', b: '8', action: Action.Exponentiate, expected: null },

  // continue cases for other actions
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test.each(testCases)('should blah-blah', ({ a, b, action, expected }) => {
    const args = { a, b, action };
    // expect(true).toBe(true);
    if (typeof expected === 'number') {
      expect(simpleCalculator(args)).toBeCloseTo(expected);
    } else {
      expect(simpleCalculator(args)).toBe(null);
    }
  });
  // Consider to use Jest table tests API to test all cases above
});
