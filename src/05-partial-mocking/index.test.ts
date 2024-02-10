// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: 'one',
    mockTwo: 'two',
    mockThree: 'three',
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    jest.spyOn(console, 'log');

    expect(mockOne).toBe('one');
    expect(mockTwo).toBe('two');
    expect(mockThree).toBe('three');
    expect(console.log).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    jest.spyOn(console, 'log');
    unmockedFunction();
    expect(console.log).toHaveBeenCalled();
  });
});
