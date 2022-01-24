import { RemoteSignup } from '@/data/usecases';
import { Signup } from '@/domain/usecases';
import { createApiUrl, createAxiosHttpClient } from '@/main/factories';

export const createRemoteSignup = (): Signup => {
  return new RemoteSignup(createApiUrl('/signup'), createAxiosHttpClient());
};
