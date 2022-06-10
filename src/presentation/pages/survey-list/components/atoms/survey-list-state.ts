import { LoadSurveyList } from '@/domain/usecases';
import { atom } from 'recoil';

export type SurveyState = {
  surveyItems: LoadSurveyList.Model[];
  error: string;
  reload: boolean;
};

export const surveyListState = atom<SurveyState>({
  key: 'surveyListState',
  default: { surveyItems: [], error: '', reload: false },
});
