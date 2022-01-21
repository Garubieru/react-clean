import React from 'react';
import { MainHeader, PageWrapper } from '@/presentation/components';
import { SurveyItem } from './components';
import Styles from './styles.scss';

const SurveyList: React.FC = () => {
  return (
    <PageWrapper header={<MainHeader />}>
      <div className={Styles.surveyListContainer}>
        <h2>Surveys</h2>
        <ul className={Styles.surveys} data-testid="surveysList">
          <SurveyItem className={Styles.survey} loading />
          <SurveyItem className={Styles.survey} loading />
          <SurveyItem className={Styles.survey} loading />
          <SurveyItem className={Styles.survey} loading />
        </ul>
      </div>
    </PageWrapper>
  );
};

export default SurveyList;
