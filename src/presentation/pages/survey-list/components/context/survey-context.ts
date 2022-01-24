import React, { createContext, useContext } from 'react';
import { SurveyModel } from '@/domain/models';

type SurveyState = {
  surveyItems: SurveyModel[];
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
