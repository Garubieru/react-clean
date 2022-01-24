import { RemoteLoadSurveyList } from '@/data/usecases';
import { LoadSurveyList } from '@/domain/usecases';
import { createApiUrl, createAuthorizeHttpGetClientDecorator } from '@/main/factories';

export const createRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(
    createApiUrl('/surveys'),
    createAuthorizeHttpGetClientDecorator(),
  );
};
