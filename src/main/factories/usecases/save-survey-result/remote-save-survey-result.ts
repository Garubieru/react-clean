import { RemoteSaveSurveyResult } from '@/data/usecases/save-survey-result/remote-save-survey-result';
import { SaveSurveyResult } from '@/domain/usecases';
import { createAuthorizeHttpGetClientDecorator } from '@/main/factories';
import { createApiUrl } from '../../http';

export const createSaveSurveyResult = (id: string): SaveSurveyResult => {
  return new RemoteSaveSurveyResult(
    createAuthorizeHttpGetClientDecorator(),
    createApiUrl(`/surveys/${id}/results`),
  );
};
