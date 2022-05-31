import { HttpClient } from '@/data/protocols/http';
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client';

export const createAxiosHttpClient = (): HttpClient => {
  return new AxiosHttpClient();
};
