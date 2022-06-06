import React, { useEffect, useState } from 'react';
import Styles from './styles.scss';
import {
  LoadingOverlay,
  MainHeader,
  PageWrapper,
  ReloadError,
} from '@/presentation/components';
import { LoadSurveyResult } from '@/domain/usecases';
import { useErrorHandler } from '@/presentation/hooks';
import { SurveyResultData } from '@/presentation/pages/survey-result/components';

type SurveyResultType = {
  loadSurveyResult: LoadSurveyResult;
};

const SurveyResult: React.FC<SurveyResultType> = ({ loadSurveyResult }) => {
  const [state, setState] = useState({
    surveyResult: null as LoadSurveyResult.Model,
    isLoading: false,
    error: '',
    reload: false,
  });

  const { surveyResult } = state;

  const handleError = useErrorHandler((error) =>
    setState((prevState) => ({ ...prevState, surveyResult: null, error: error.message })),
  );

  const handleReload = (): void => {
    setState((prevState) => ({
      surveyResult: null,
      isLoading: false,
      error: '',
      reload: !prevState.reload,
    }));
  };

  useEffect(() => {
    const loadSurvey = async (): Promise<void> => {
      try {
        const result = await loadSurveyResult.load();
        setState((prevState) => ({ ...prevState, surveyResult: result }));
      } catch (e) {
        handleError(e);
      }
    };
    loadSurvey();
  }, [state.reload]);

  return (
    <PageWrapper header={<MainHeader />}>
      <div className={Styles.surveyContainer} data-testid="survey-container">
        {surveyResult && <SurveyResultData surveyResult={surveyResult} />}

        {state.isLoading && <LoadingOverlay />}
        {state.error && <ReloadError error={state.error} handleReload={handleReload} />}
      </div>
    </PageWrapper>
  );
};

export default SurveyResult;
