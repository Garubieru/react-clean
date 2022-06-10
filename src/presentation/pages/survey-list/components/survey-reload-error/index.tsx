import React from 'react';
import { useRecoilState } from 'recoil';
import { ReloadError } from '@/presentation/components';
import { surveyListState } from '@/presentation/pages/survey-list/components';

const SurveyReloadError: React.FC = () => {
  const [state, setState] = useRecoilState(surveyListState);
  const handleReload = (): void => {
    setState((prevState) => ({ error: '', reload: !prevState.reload, surveyItems: [] }));
  };
  return <ReloadError handleReload={handleReload} error={state.error} />;
};

export default SurveyReloadError;
