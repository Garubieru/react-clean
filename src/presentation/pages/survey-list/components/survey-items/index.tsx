import React from 'react';
import {
  SurveyItem,
  useSurveyContext,
} from '@/presentation/pages/survey-list/components';

import Styles from './styles.scss';

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

const SurveyItems: React.FC = () => {
  const { surveyScreenState } = useSurveyContext();
  return (
    <ul className={Styles.surveys} data-testid="surveys-list">
      {surveyScreenState.surveyItems.length === 0 ? (
        <EmptySurveyItems />
      ) : (
        <>
          {surveyScreenState.surveyItems.map((surveyItem) => (
            <SurveyItem key={surveyItem.id} surveyData={surveyItem} />
          ))}
        </>
      )}
    </ul>
  );
};

export default SurveyItems;
