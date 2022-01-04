import axios from 'axios';
import faker from 'faker';
import { AxiosHttpClient } from './axios-http-client';
import { HttpPostParams } from '@/data/protocols/http';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAxiosResponse = {
  data: faker.random.objectElement(),
  status: faker.datatype.number(),
};
mockedAxios.post.mockResolvedValue(mockedAxiosResponse);

const createSut = (): AxiosHttpClient => new AxiosHttpClient();

const mockPostParams = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

describe('AxiosHttpClient', () => {
  it('Should call axios.post with correct VALUES', async () => {
    const mockedParams = mockPostParams();
    const sut = createSut();
    await sut.post(mockedParams);
    expect(mockedAxios.post).toHaveBeenCalledWith(mockedParams.url, mockedParams.body);
  });

  it('Should return the correct statusCode and body', async () => {
    const sut = createSut();
    const httpResponse = await sut.post(mockPostParams());
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResponse.status,
      body: mockedAxiosResponse.data,
    });
  });
});
