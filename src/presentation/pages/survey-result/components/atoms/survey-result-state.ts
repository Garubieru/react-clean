import { LoadSurveyResult } from '@/domain/usecases';
import { atom } from 'recoil';

export const surveyResultState = atom({
  key: 'surveyResultState',
  default: {
    surveyResult: null as LoadSurveyResult.Model,
    isLoading: false,
    error: '',
    reload: false,
  },
});

export const surveyAnswerState = atom({
  key: 'surveySelectorState',
  default: {
    onAnswer: (params: string) => {},
  },
});
