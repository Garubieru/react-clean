import React, { useEffect, useState } from 'react';
import Styles from './styles.scss';
import {
  Button,
  LoadingOverlay,
  MainHeader,
  PageWrapper,
  ReloadError,
} from '@/presentation/components';
import FlipMove from 'react-flip-move';
import Calendar from '@/presentation/components/atoms/calendar';
import { LoadSurveyResult } from '@/domain/usecases';

type SurveyResultType = {
  loadSurveyResult: LoadSurveyResult;
};

const SurveyResult: React.FC<SurveyResultType> = ({ loadSurveyResult }) => {
  const [state] = useState({
    surveyResult: null as LoadSurveyResult.Model,
    isLoading: false,
    error: '',
  });

  useEffect(() => {
    const loadSurvey = async (): Promise<void> => {
      await loadSurveyResult.load();
    };
    loadSurvey();
  }, []);

  return (
    <PageWrapper header={<MainHeader />}>
      <div className={Styles.surveyContainer} data-testid="survey-container">
        {state.surveyResult && (
          <>
            <hgroup className={Styles.surveyGeneralInfo}>
              <Calendar time={state.surveyResult.date} />
              <h1>
                Qual é seu framework web favorito? Qual é seu framework web favorito? Qual
                é seu framework web favorito? Qual é seu framework web favorito? Qual é
              </h1>
            </hgroup>

            <FlipMove
              className={Styles.surveyResultList}
              typeName="ul"
              appearAnimation="elevator"
            >
              {state.surveyResult.answers.map((answer) => (
                <li
                  key={answer.answer}
                  className={Styles.surveyResultItem}
                  data-active={answer.isCurrentAccountAnswer}
                >
                  <div className={Styles.surveyInfoWrapper}>
                    <img src={answer.image} alt={answer.answer} />
                    <p>{answer.answer}</p>
                  </div>

                  <span className={Styles.surveyPercentage}>{answer.percent}%</span>
                </li>
              ))}
            </FlipMove>

            <Button className={Styles.backButton}>Voltar</Button>
          </>
        )}

        {state.isLoading && <LoadingOverlay />}
        {state.error && <ReloadError error={state.error} handleReload={() => {}} />}
      </div>
    </PageWrapper>
  );
};

export default SurveyResult;
