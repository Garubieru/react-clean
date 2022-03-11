import React from 'react';
import FlipMove from 'react-flip-move';
import { Calendar, Button } from '@/presentation/components';
import { SurveyResultItem } from '@/presentation/pages/survey-result/components';
import { LoadSurveyResult } from '@/domain/usecases';
import Styles from './styles.scss';

type SurveyResultDataProps = {
  surveyResult: LoadSurveyResult.Model;
};

const SurveyResultData: React.FC<SurveyResultDataProps> = ({ surveyResult }) => {
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

      <Button className={Styles.backButton}>Voltar</Button>
    </>
  );
};

export default SurveyResultData;
