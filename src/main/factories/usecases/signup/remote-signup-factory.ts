import { RemoteSignup } from '@/data/usecases';
import { Signup } from '@/domain/usecases';
import { createApiUrl, createAxiosHttpClient } from '@/main/factories/http';

export const createRemoteSignup = (): Signup => {
  return new RemoteSignup(createApiUrl('/signup'), createAxiosHttpClient());
};
