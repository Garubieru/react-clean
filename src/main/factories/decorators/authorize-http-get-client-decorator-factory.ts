import { AuthorizeHttpClientDecorator } from '@/main/decorators';
import { createLocalStorage, createAxiosHttpClient } from '@/main/factories';
import { HttpClient } from '@/data/protocols/http';

export const createAuthorizeHttpGetClientDecorator = (): HttpClient => {
  return new AuthorizeHttpClientDecorator(createLocalStorage(), createAxiosHttpClient());
};
