import { AxiosHttpClient } from './axios-http-client';
import { AxiosMockType, mockAxios } from '@/infra/test';
import { mockPostParams } from '@/data/test';

jest.mock('axios');

type SutType = {
  mockedAxios: AxiosMockType;
  sut: AxiosHttpClient;
};

const createSut = (): SutType => ({
  sut: new AxiosHttpClient(),
  mockedAxios: mockAxios(),
});

describe('AxiosHttpClient', () => {
  it('Should call axios.post with correct VALUES', async () => {
    const mockedParams = mockPostParams();
    const { sut, mockedAxios } = createSut();
    await sut.post(mockedParams);
    expect(mockedAxios.post).toHaveBeenCalledWith(mockedParams.url, mockedParams.body);
  });

  it('Should return the correct statusCode and body', () => {
    const { sut, mockedAxios } = createSut();
    const httpResponse = sut.post(mockPostParams());
    expect(httpResponse).toEqual(mockedAxios.post.mock.results[0].value);
  });
});
