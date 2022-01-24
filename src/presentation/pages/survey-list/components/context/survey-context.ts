import { LoadSurveyList } from '@/domain/usecases';
import React, { createContext, useContext } from 'react';

export type SurveyState = {
  surveyItems: LoadSurveyList.Model[];
  error: string;
  reload: boolean;
};

type SurveyContextProps = {
  surveyScreenState: SurveyState;
  setSurveyScreenState: React.Dispatch<React.SetStateAction<SurveyState>>;
};

export const SurveyContext = createContext<SurveyContextProps>(null);

export const useSurveyContext = (): SurveyContextProps => {
  return useContext(SurveyContext);
};
