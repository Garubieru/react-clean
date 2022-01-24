import React from 'react';
import Styles from './styles.scss';
import SurveyIconStatus, { IconStatus } from '../survey-icon-status';

import { LoadSurveyList } from '@/domain/usecases';

type SurveyItemProps = {
  className?: string;
  loading?: boolean;
  surveyData?: LoadSurveyList.Model;
};

const SurveyItem: React.FC<SurveyItemProps> = ({ className, loading, surveyData }) => {
  const surveyTime = surveyData?.date;
  return (
    <li className={[Styles.surveyItem, className].join(' ')} data-testid="survey-item">
      {!loading && (
        <>
          <SurveyIconStatus
            className={Styles.surveyIcon}
            iconName={surveyData.didAnswer ? IconStatus.thumbsUp : IconStatus.thumbsDown}
          />
          <div className={Styles.surveyContent}>
            <time className={Styles.surveyTime}>
              <span className={Styles.surveyDay}>
                {surveyTime.getDate().toString().padStart(2, '0')}
              </span>
              <span className={Styles.surveyMonth}>
                {surveyTime
                  .toLocaleDateString('pt-BR', { month: 'short' })
                  .replace('.', '')}
              </span>
              <span className={Styles.surveyYear}>{surveyTime.getFullYear()}</span>
            </time>
            <h3 className={Styles.surveyQuestion}>{surveyData.question}</h3>
          </div>
          <footer>See results</footer>
        </>
      )}
    </li>
  );
};

export default SurveyItem;
