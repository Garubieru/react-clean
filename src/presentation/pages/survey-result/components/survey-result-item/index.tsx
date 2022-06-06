import React from 'react';
import Styles from './styles.scss';
import { SurveyResultAnswerModel } from '@/domain/models';

type SurveyResultItemProps = {
  answerData: SurveyResultAnswerModel;
};

const SurveyResultItem: React.FC<SurveyResultItemProps> = ({ answerData }) => {
  return (
    <li
      className={Styles.surveyResultItem}
      data-active={answerData.isCurrentAccountAnswer}
      data-testid="answer-item"
    >
      <div className={Styles.surveyInfoWrapper}>
        {answerData.image && (
          <img data-testid="image" src={answerData.image} alt={answerData.answer} />
        )}
        <p data-testid="answer">{answerData.answer}</p>
      </div>

      <span data-testid="percent" className={Styles.surveyPercentage}>
        {answerData.percent}%
      </span>
    </li>
  );
};

export default SurveyResultItem;
