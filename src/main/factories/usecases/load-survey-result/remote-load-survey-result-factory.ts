import { RemoteLoadSurveyResult } from '@/data/usecases';
import { createApiUrl } from '@/main/factories/http';
import { createAuthorizeHttpGetClientDecorator } from '@/main/factories/decorators';

export const createRemoteLoadSurveyResult = (id: string): RemoteLoadSurveyResult => {
  return new RemoteLoadSurveyResult(
    createApiUrl(`/surveys/${id}/results`),
    createAuthorizeHttpGetClientDecorator(),
  );
};
