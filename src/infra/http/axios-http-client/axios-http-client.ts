import {
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from '@/data/protocols/http';
import axios, { AxiosError, AxiosResponse } from 'axios';

export class AxiosHttpClient implements HttpPostClient {
  async post(params: HttpPostParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.post(params.url, params.body);
    } catch (e) {
      const axiosError = e as AxiosError;
      axiosResponse = axiosError.response;
    }
    return { statusCode: axiosResponse.status, body: axiosResponse.data };
  }

  async get(params: HttpGetParams): Promise<HttpResponse> {
    try {
      const { data, status } = await axios.get(params.url);
      return {
        body: data,
        statusCode: status,
      };
    } catch (e) {
      const { response } = e as AxiosError;
      return {
        body: response.data,
        statusCode: response.status,
      };
    }
  }
}
