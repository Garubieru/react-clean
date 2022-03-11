import React from 'react';
import { SurveyItem } from '@/presentation/pages/survey-list/components';

import Styles from './styles.scss';
import { LoadSurveyList } from '@/domain/usecases';

type SurveyItemProps = {
  surveyItems: LoadSurveyList.Model[];
};

const EmptySurveyItems: React.FC = () => {
  return (
    <>
      <SurveyItem className={Styles.survey} loading />
      <SurveyItem className={Styles.survey} loading />
      <SurveyItem className={Styles.survey} loading />
      <SurveyItem className={Styles.survey} loading />
    </>
  );
};

const SurveyItems: React.FC<SurveyItemProps> = ({ surveyItems }) => {
  return (
    <ul className={Styles.surveys} data-testid="surveys-list">
      {surveyItems.length === 0 ? (
        <EmptySurveyItems />
      ) : (
        <>
          {surveyItems.map((surveyItem) => (
            <SurveyItem
              key={surveyItem.id}
              surveyData={surveyItem}
              className={Styles.survey}
            />
          ))}
        </>
      )}
    </ul>
  );
};

export default SurveyItems;
