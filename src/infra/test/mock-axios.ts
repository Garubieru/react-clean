import axios from 'axios';
import faker from 'faker';

export type AxiosMockType = jest.Mocked<typeof axios>;

export const mockHttpResponse = (): any => ({
  data: faker.random.objectElement(),
  status: faker.datatype.number(),
});

export const mockAxios = (): AxiosMockType => {
  const mockedAxios = axios as AxiosMockType;
  mockedAxios.post.mockResolvedValue(mockHttpResponse());
  mockedAxios.get.mockResolvedValue(mockHttpResponse());
  return mockedAxios;
};
