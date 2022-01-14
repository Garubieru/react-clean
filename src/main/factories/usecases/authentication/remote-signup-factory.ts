import { RemoteSignup } from '@/data/usecases';
import { RemoteSignupProtocol } from '@/domain/usecases';
import { createApiUrl, createAxiosHttpPostClient } from '@/main/factories/http';

export const createRemoteSignup = (): RemoteSignupProtocol => {
  return new RemoteSignup(createApiUrl('/signup'), createAxiosHttpPostClient());
};
