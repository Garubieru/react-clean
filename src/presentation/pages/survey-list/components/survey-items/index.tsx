import React from 'react';
import { useRecoilValue } from 'recoil';
import { SurveyItem, surveyListState } from '@/presentation/pages/survey-list/components';
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
  const { surveyItems } = useRecoilValue(surveyListState);
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
