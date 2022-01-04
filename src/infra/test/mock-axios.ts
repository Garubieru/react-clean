import axios from 'axios';
import faker from 'faker';

export type AxiosMockType = jest.Mocked<typeof axios>;

export const mockAxios = (): AxiosMockType => {
  const mockedAxios = axios as AxiosMockType;
  mockedAxios.post.mockResolvedValue({
    data: faker.random.objectElement(),
    status: faker.datatype.number(),
  });
  return mockedAxios;
};
