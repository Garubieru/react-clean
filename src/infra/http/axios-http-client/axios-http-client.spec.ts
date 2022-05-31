import { AxiosHttpClient } from './axios-http-client';
import { AxiosMockType, mockAxios, mockHttpResponse } from '@/infra/test';
import { mockHttpRequestParams } from '@/data/test';

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
  it('Should call axios with correct METHOD and VALUES', async () => {
    const mockedRequestParams = mockHttpRequestParams();
    const { sut, mockedAxios } = createSut();
    await sut.request(mockedRequestParams);
    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: mockedRequestParams.url,
      method: mockedRequestParams.method,
      headers: mockedRequestParams.headers,
      data: mockedRequestParams.body,
    });
  });

  it('Should return the correct statusCode and body on success in axios.request', async () => {
    const { sut, mockedAxios } = createSut();
    const httpResponse = await sut.request(mockHttpRequestParams());
    const axiosResponse = await mockedAxios.request.mock.results[0].value;
    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    });
  });

  it('Should return correct statusCode and body on fail in axios.request', async () => {
    const { sut, mockedAxios } = createSut();
    const mockedError = mockHttpResponse();
    mockedAxios.request.mockRejectedValueOnce({
      response: mockedError,
    });
    const httpResponse = await sut.request(mockHttpRequestParams());
    expect(httpResponse).toEqual({
      statusCode: mockedError.status,
      body: mockedError.data,
    });
  });
});
