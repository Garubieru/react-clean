import React from 'react';
import Styles from './styles.scss';
import { SurveyResultAnswerModel } from '@/domain/models';
import { surveyAnswerState } from '@/presentation/pages/survey-result/components';
import { useRecoilValue } from 'recoil';

type SurveyResultItemProps = {
  answerData: SurveyResultAnswerModel;
};

const SurveyResultItem: React.FC<SurveyResultItemProps> = ({ answerData }) => {
  const { onAnswer } = useRecoilValue(surveyAnswerState);
  const { answer, isCurrentAccountAnswer, percent, image } = answerData;

  const handleClick: React.MouseEventHandler<HTMLLIElement> = () => {
    if (isCurrentAccountAnswer) return;
    onAnswer(answer);
  };

  return (
    <li
      className={Styles.surveyResultItem}
      data-active={isCurrentAccountAnswer}
      data-testid="answer-item"
      onClick={handleClick}
    >
      <div className={Styles.surveyInfoWrapper}>
        {image && <img data-testid="image" src={image} alt={answer} />}
        <p data-testid="answer">{answer}</p>
      </div>

      <span data-testid="percent" className={Styles.surveyPercentage}>
        {percent}%
      </span>
    </li>
  );
};

export default SurveyResultItem;
