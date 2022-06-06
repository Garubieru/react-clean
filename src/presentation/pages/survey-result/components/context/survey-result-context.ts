import { createContext, useContext } from 'react';

export type SurveyResultContextProps = {
  onAnswer: (answer: string) => Promise<void>;
};

export const SurveyResultContext = createContext<SurveyResultContextProps>(null);

export const useSurveyContext = (): SurveyResultContextProps => {
  return useContext(SurveyResultContext);
};
