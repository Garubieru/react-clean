import axios from 'axios';
import faker from 'faker';

export type AxiosMockType = jest.Mocked<typeof axios>;

type MockHttpResponseType = {
  data: string;
  status: number;
};

export const mockHttpResponse = (): MockHttpResponseType => ({
  data: faker.random.objectElement(),
  status: faker.datatype.number(),
});

export const mockAxios = (): AxiosMockType => {
  const mockedAxios = axios as AxiosMockType;
  mockedAxios.post.mockClear().mockResolvedValue(mockHttpResponse());
  mockedAxios.get.mockClear().mockResolvedValue(mockHttpResponse());
  return mockedAxios;
};
