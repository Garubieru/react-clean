import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication';
import { AuthenticationProtocol } from '@/domain/usecases';
import { createAxiosHttpPostClient, createApiLoginUrl } from '@/main/factories/http';

export const createRemoteAuthentication = (): AuthenticationProtocol => {
  return new RemoteAuthentication(createApiLoginUrl(), createAxiosHttpPostClient());
};
