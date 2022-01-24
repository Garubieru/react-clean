import { AuthorizeHttpGetClientDecorator } from '@/main/decorators';
import { createLocalStorage, createAxiosHttpClient } from '@/main/factories';
import { HttpGetClient } from '@/data/protocols/http';

export const createAuthorizeHttpGetClientDecorator = (): HttpGetClient => {
  return new AuthorizeHttpGetClientDecorator(
    createLocalStorage(),
    createAxiosHttpClient(),
  );
};
