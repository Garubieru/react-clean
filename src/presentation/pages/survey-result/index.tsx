import React, { useEffect, useState } from 'react';
import Styles from './styles.scss';
import {
  LoadingOverlay,
  MainHeader,
  PageWrapper,
  ReloadError,
} from '@/presentation/components';
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases';
import { useErrorHandler } from '@/presentation/hooks';
import {
  SurveyResultData,
  SurveyResultContext,
} from '@/presentation/pages/survey-result/components';

type SurveyResultType = {
  loadSurveyResult: LoadSurveyResult;
  saveSurveyResult: SaveSurveyResult;
};

const SurveyResult: React.FC<SurveyResultType> = ({
  loadSurveyResult,
  saveSurveyResult,
}) => {
  const [state, setState] = useState({
    surveyResult: null as LoadSurveyResult.Model,
    isLoading: false,
    error: '',
    reload: false,
  });

  const { surveyResult } = state;

  const handleError = useErrorHandler((error) =>
    setState((prevState) => ({
      ...prevState,
      surveyResult: null,
      error: error.message,
      isLoading: false,
    })),
  );

  const handleReload = (): void => {
    setState((prevState) => ({
      surveyResult: null,
      isLoading: false,
      error: '',
      reload: !prevState.reload,
    }));
  };

  const onAnswer = async (answer: string): Promise<void> => {
    try {
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
      }));
      const result = await saveSurveyResult.save({ answer });
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        surveyResult: result,
      }));
    } catch (e) {
      handleError(e);
    }
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
        <SurveyResultContext.Provider value={{ onAnswer }}>
          {surveyResult && <SurveyResultData surveyResult={surveyResult} />}
        </SurveyResultContext.Provider>

        {state.isLoading && <LoadingOverlay />}
        {state.error && <ReloadError error={state.error} handleReload={handleReload} />}
      </div>
    </PageWrapper>
  );
};

export default SurveyResult;
