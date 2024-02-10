// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(
      simpleCalculator({
        a: 1,
        b: 2,
        action: Action.Add,
      }),
    ).toBe(3);
  });

  test('should subtract two numbers', () => {
    expect(
      simpleCalculator({
        a: 5,
        b: 3,
        action: Action.Subtract,
      }),
    ).toBe(2);
  });

  test('should multiply two numbers', () => {
    expect(
      simpleCalculator({
        a: 6,
        b: 2,
        action: Action.Multiply,
      }),
    ).toBe(12);
  });

  test('should divide two numbers', () => {
    expect(
      simpleCalculator({
        a: 15,
        b: 3,
        action: Action.Divide,
      }),
    ).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({
        a: 2,
        b: 8,
        action: Action.Exponentiate,
      }),
    ).toBe(256);
  });

  test('should return null for invalid action', () => {
    expect(
      simpleCalculator({
        a: 1,
        b: 2,
        action: '=',
      }),
    ).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({
        a: '1',
        b: '3',
        action: Action.Add,
      }),
    ).toBe(null);
  });
});
