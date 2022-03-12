import React from 'react';
import FlipMove from 'react-flip-move';
import { useNavigate } from 'react-router-dom';
import { Calendar, Button } from '@/presentation/components';
import { SurveyResultItem } from '@/presentation/pages/survey-result/components';
import { LoadSurveyResult } from '@/domain/usecases';
import Styles from './styles.scss';

type SurveyResultDataProps = {
  surveyResult: LoadSurveyResult.Model;
};

const SurveyResultData: React.FC<SurveyResultDataProps> = ({ surveyResult }) => {
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
