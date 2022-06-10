import React from 'react';
import FlipMove from 'react-flip-move';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Calendar, Button } from '@/presentation/components';
import {
  SurveyResultItem,
  surveyResultState,
} from '@/presentation/pages/survey-result/components';
import Styles from './styles.scss';

const SurveyResultData: React.FC = () => {
  const { surveyResult } = useRecoilValue(surveyResultState);
  const navigate = useNavigate();
  return (
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
        <>
          {surveyResult.answers.map((answerData) => (
            <SurveyResultItem answerData={answerData} key={answerData.answer} />
          ))}
        </>
      </FlipMove>

      <Button
        data-testid="back-button"
        className={Styles.backButton}
        onClick={() => navigate(-1)}
      >
        Voltar
      </Button>
    </>
  );
};

export default SurveyResultData;
