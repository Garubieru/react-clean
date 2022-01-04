import { AxiosHttpClient } from './axios-http-client';
import axios from 'axios';
import faker from 'faker';
import { HttpPostParams } from '@/data/protocols/http';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const createSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

const mockPostParams = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

describe('AxiosHttpClient', () => {
  it('Should call axios with correct VALUES', async () => {
    const mockedParams = mockPostParams();
    const sut = createSut();
    await sut.post(mockedParams);
    expect(mockedAxios.post).toHaveBeenCalledWith(mockedParams.url, mockedParams.body);
  });
});
