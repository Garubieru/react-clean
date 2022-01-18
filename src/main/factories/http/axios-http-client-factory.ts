import { HttpPostClient } from '@/data/protocols/http';
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client';

export const createAxiosHttpPostClient = (): HttpPostClient => {
  return new AxiosHttpClient();
};
