// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import promises from 'fs/promises';
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  const callback = jest.fn();
  const timeout = 666;

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(callback, timeout);
    jest.advanceTimersByTime(timeout);
    expect(setTimeout).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timeout);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(timeout);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  const callback = jest.fn();
  const interval = 777;

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(callback, interval);
    jest.advanceTimersByTime(interval);
    expect(setInterval).toHaveBeenCalled();
    expect(setInterval).toHaveBeenLastCalledWith(
      expect.any(Function),
      interval,
    );
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, interval);
    expect(setInterval).toHaveBeenLastCalledWith(
      expect.any(Function),
      interval,
    );
    jest.advanceTimersByTime(interval * 7);
    expect(callback).toBeCalledTimes(14);
  });
});

jest.mock('fs');
jest.mock('fs/promises');

describe('readFileAsynchronously', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  const pathToFile = 'anyFile.txt';

  const mockFs = jest.mocked(fs);

  test('should call join with pathToFile', async () => {
    const mockJoin = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(path.join).toHaveBeenCalledTimes(1);
    const joinArgsCalls = mockJoin.mock.calls[0];
    expect(path.join).toHaveBeenCalledWith(...(joinArgsCalls as []));
    expect(joinArgsCalls?.pop()).toEqual(pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(mockFs.existsSync).toHaveBeenCalledTimes(0);
    expect(await readFileAsynchronously(pathToFile)).toBe(null);
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(promises, 'readFile').mockResolvedValue('file content');
    expect(await readFileAsynchronously(pathToFile)).toBe('file content');
  });
});
