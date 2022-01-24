import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client';

export const createAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};
