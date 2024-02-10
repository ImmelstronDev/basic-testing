// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';
jest.mock('axios');

const mockAxios = jest.mocked(axios);
const relativePath = 'http://vk.com';
const mockConfig = {
  baseURL: 'https://jsonplaceholder.typicode.com',
};
const mockResData = {
  data: {
    id: 73,
    firstName: 'Obi Van',
    lastName: 'Kenobi',
  },
};
describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  beforeEach(() => {
    mockAxios.create.mockReturnThis();
    mockAxios.get.mockResolvedValue(mockResData);
  });
  afterEach(() => {
    jest.resetAllMocks();
    jest.runAllTimers();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);
    expect(mockAxios.create).toHaveBeenCalledTimes(1);
    expect(mockAxios.create).toHaveBeenCalledWith(mockConfig);
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relativePath);
    expect(mockAxios.create).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    expect(await throttledGetDataFromApi(relativePath)).toEqual(
      mockResData.data,
    );
  });
});
