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

    it('Should return the correct statusCode and body on success in axios.post', async () => {
      const { sut, mockedAxios } = createSut();
      const httpResponse = await sut.post(mockPostParams());
      const axiosResponse = await mockedAxios.post.mock.results[0].value;
      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      });
    });

    it('Should return correct statusCode and body on fail in axios.post', async () => {
      const { sut, mockedAxios } = createSut();
      const mockedError = mockHttpResponse();
      mockedAxios.post.mockRejectedValueOnce({ response: mockedError });
      const httpResponse = await sut.post(mockPostParams());
      expect(httpResponse).toEqual({
        statusCode: mockedError.status,
        body: mockedError.data,
      });
    });
  });

  describe('get', () => {
    it('Should call axios.get with correct VALUES', async () => {
      const mockedGetParams = mockGetParams();
      const { sut, mockedAxios } = createSut();
      await sut.get(mockedGetParams);
      expect(mockedAxios.get).toBeCalledWith(mockedGetParams.url);
    });

    it('Should return the correct statusCode and body on success in axios.get', async () => {
      const { sut, mockedAxios } = createSut();
      const httpResponse = await sut.get(mockGetParams());
      const axiosResponse = await mockedAxios.get.mock.results[0].value;
      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      });
    });

    it('Should return correct statusCode and body on fail in axios.get', async () => {
      const { sut, mockedAxios } = createSut();
      const mockError = mockHttpResponse();
      mockedAxios.get.mockRejectedValueOnce({ response: mockError });
      const httpResponse = await sut.get(mockGetParams());
      expect(httpResponse).toEqual({
        statusCode: mockError.status,
        body: mockError.data,
      });
    });
  });
});
