import { SurveyModel } from '@/domain/models';

export interface LoadSurveyList {
  list: () => Promise<SurveyModel[]>;
}
