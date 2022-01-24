import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication';
import { Authentication } from '@/domain/usecases';
import { createAxiosHttpClient, createApiUrl } from '@/main/factories';

export const createRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(createApiUrl('/login'), createAxiosHttpClient());
};
