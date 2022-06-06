import React from 'react';
import { useParams } from 'react-router-dom';
import { SurveyResult } from '@/presentation/pages';
import {
  createRemoteLoadSurveyResult,
  createSaveSurveyResult,
} from '@/main/factories/usecases';

export const CreateSurveyResult: React.FC = () => {
  const params = useParams();
  return (
    <SurveyResult
      loadSurveyResult={createRemoteLoadSurveyResult(params.id)}
      saveSurveyResult={createSaveSurveyResult(params.id)}
    />
  );
};
