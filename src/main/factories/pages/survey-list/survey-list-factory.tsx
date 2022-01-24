import React from 'react';
import { SurveyList } from '@/presentation/pages';
import { createRemoteLoadSurveyList } from '@/main/factories';

export const CreateSurveyList: React.FC = () => {
  return <SurveyList loadSurveyList={createRemoteLoadSurveyList()} />;
};
