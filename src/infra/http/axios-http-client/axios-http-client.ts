import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http';
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
}
