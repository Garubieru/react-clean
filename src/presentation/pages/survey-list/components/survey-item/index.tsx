import React from 'react';
import Styles from './styles.scss';
import { Calendar } from '@/presentation/components';
import {
  IconStatus,
  SurveyIconStatus,
} from '@/presentation/pages/survey-list/components';

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
            <Calendar time={surveyTime} className={Styles.surveyTime} />
            <h3 data-testid="survey-question" className={Styles.surveyQuestion}>
              {surveyData.question}
            </h3>
          </div>
          <footer>See results</footer>
        </>
      )}
    </li>
  );
};

export default SurveyItem;
