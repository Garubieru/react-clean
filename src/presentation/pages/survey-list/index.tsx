import React from 'react';
import { SurveyItem, MainHeader, PageWrapper } from '@/presentation/components';
import Styles from './styles.scss';

const SurveyList: React.FC = () => {
  return (
    <PageWrapper header={<MainHeader />}>
      <div className={Styles.surveyListContainer}>
        <h2>Surveys</h2>
        <ul className={Styles.surveys}>
          <SurveyItem className={Styles.survey} />
          <SurveyItem className={Styles.survey} />
          <SurveyItem className={Styles.survey} />
        </ul>
      </div>
    </PageWrapper>
  );
};

export default SurveyList;
