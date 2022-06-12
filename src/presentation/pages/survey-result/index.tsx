import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases';
import { LoadingOverlay, MainHeader, PageWrapper } from '@/presentation/components';
import { useErrorHandler } from '@/presentation/hooks';
import {
  SurveyResultData,
  surveyResultState,
  surveyAnswerState,
  SurveyReloadError,
} from '@/presentation/pages/survey-result/components';
import Styles from './styles.scss';

type SurveyResultType = {
  loadSurveyResult: LoadSurveyResult;
  saveSurveyResult: SaveSurveyResult;
};

const SurveyResult: React.FC<SurveyResultType> = ({
  loadSurveyResult,
  saveSurveyResult,
}) => {
  const [state, setState] = useRecoilState(surveyResultState);
  const setOnAnswer = useSetRecoilState(surveyAnswerState);

  const handleError = useErrorHandler((error) =>
    setState((prevState) => ({
      ...prevState,
      surveyResult: null,
      error: error.message,
      isLoading: false,
    })),
  );

  const onAnswer = async (answer: string): Promise<void> => {
    if (state.isLoading) return;
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
    setOnAnswer({ onAnswer });
  }, []);

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
        {state.surveyResult && <SurveyResultData />}
        {state.isLoading && <LoadingOverlay />}
        {state.error && <SurveyReloadError />}
      </div>
    </PageWrapper>
  );
};

export default SurveyResult;
