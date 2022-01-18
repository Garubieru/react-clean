import { AxiosHttpClient } from './axios-http-client';
import { AxiosMockType, mockAxios, mockHttpResponse } from '@/infra/test';
import { mockGetParams, mockPostParams } from '@/data/test';

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
  describe('post', () => {
    it('Should call axios.post with correct VALUES', async () => {
      const mockedParams = mockPostParams();
      const { sut, mockedAxios } = createSut();
      await sut.post(mockedParams);
      expect(mockedAxios.post).toHaveBeenCalledWith(mockedParams.url, mockedParams.body);
    });

    it('Should return the correct statusCode and body on axios.post', () => {
      const { sut, mockedAxios } = createSut();
      const promise = sut.post(mockPostParams());
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
    });

    it('Should return the correct statusCode and body on failure on axios.post', () => {
      const { sut, mockedAxios } = createSut();
      mockedAxios.post.mockRejectedValue({ response: mockHttpResponse() });
      const promise = sut.post(mockPostParams());
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
    });
  });

  describe('get', () => {
    it('Should call axios.get with correct VALUES', async () => {
      const mockedGetParams = mockGetParams();
      const { sut, mockedAxios } = createSut();
      await sut.get(mockedGetParams);
      expect(mockedAxios.get).toBeCalledWith(mockedGetParams.url);
    });

    it('Should return the correct statusCode and body on axios.get', () => {
      const { sut, mockedAxios } = createSut();
      const promise = sut.get(mockGetParams());
      expect(promise).toEqual(mockedAxios.get.mock.results[0].value);
    });
  });
});
