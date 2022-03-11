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
  const [state, setState] = useState({
    surveyResult: null as LoadSurveyResult.Model,
    isLoading: false,
    error: '',
  });

  const { surveyResult } = state;

  useEffect(() => {
    const loadSurvey = async (): Promise<void> => {
      const result = await loadSurveyResult.load();
      setState((prevState) => ({ ...prevState, surveyResult: result }));
    };
    loadSurvey();
  }, []);

  return (
    <PageWrapper header={<MainHeader />}>
      <div className={Styles.surveyContainer} data-testid="survey-container">
        {surveyResult && (
          <>
            <hgroup className={Styles.surveyGeneralInfo}>
              <Calendar time={surveyResult.date} />
              <h1 data-testid="survey-question">{surveyResult.question}</h1>
            </hgroup>

            <FlipMove
              className={Styles.surveyResultList}
              typeName="ul"
              appearAnimation="elevator"
              data-testid="survey-result-answers"
            >
              {surveyResult.answers.map((answer) => (
                <li
                  key={answer.answer}
                  className={Styles.surveyResultItem}
                  data-active={answer.isCurrentAccountAnswer}
                  data-testid="answer-item"
                >
                  <div className={Styles.surveyInfoWrapper}>
                    {answer.image && (
                      <img data-testid="image" src={answer.image} alt={answer.answer} />
                    )}
                    <p data-testid="answer">{answer.answer}</p>
                  </div>

                  <span data-testid="percent" className={Styles.surveyPercentage}>
                    {answer.percent}%
                  </span>
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
