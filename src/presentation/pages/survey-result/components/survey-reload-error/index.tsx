import React from 'react';
import { useRecoilState } from 'recoil';
import { ReloadError } from '@/presentation/components';
import { surveyResultState } from '@/presentation/pages/survey-result/components';

const SurveyReloadError: React.FC = () => {
  const [state, setState] = useRecoilState(surveyResultState);

  const handleReload = (): void => {
    setState((prevState) => ({
      error: '',
      reload: !prevState.reload,
      surveyResult: null,
      isLoading: false,
    }));
  };

  return <ReloadError handleReload={handleReload} error={state.error} />;
};

export default SurveyReloadError;
