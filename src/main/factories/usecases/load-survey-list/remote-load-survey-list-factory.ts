import { RemoteLoadSurveyList } from '@/data/usecases';
import { LoadSurveyList } from '@/domain/usecases';
import { createApiUrl, createAxiosHttpClient } from '@/main/factories';

export const createRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(createApiUrl('/surveys'), createAxiosHttpClient());
};
