// Uncomment the code below and write your tests
import lodash from 'lodash';
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('should create account with initial balance', () => {
    const acc = getBankAccount(666);
    expect(acc.getBalance()).toBe(666);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const acc = getBankAccount(666);
    expect(() => acc.withdraw(777)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const acc = getBankAccount(666);
    const acc2 = getBankAccount(555);
    expect(() => acc.transfer(777, acc2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const acc = getBankAccount(666);
    expect(() => acc.transfer(1, acc)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const acc = getBankAccount(666);
    expect(acc.deposit(111).getBalance()).toBe(777);
  });

  test('should withdraw money', () => {
    const acc = getBankAccount(666);
    expect(acc.withdraw(111).getBalance()).toBe(555);
  });

  test('should transfer money', () => {
    const acc = getBankAccount(666);
    const acc2 = getBankAccount(555);
    expect(acc.transfer(111, acc2).getBalance()).toBe(555);
    expect(acc2.getBalance()).toBe(666);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const acc = getBankAccount(666);
    lodash.random = jest.fn().mockImplementationOnce(() => 1);
    expect(await acc.fetchBalance()).toEqual(expect.any(Number));
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const acc = getBankAccount(666);
    const startBalance = acc.getBalance();
    acc.fetchBalance = jest.fn().mockImplementationOnce(() => 1);
    await acc.synchronizeBalance();
    const newBalance = acc.getBalance();
    expect(acc.fetchBalance).toBeCalledTimes(1);
    expect(newBalance).not.toEqual(startBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const acc = getBankAccount(666);
    acc.fetchBalance = jest.fn().mockImplementationOnce(() => null);
    await expect(acc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
