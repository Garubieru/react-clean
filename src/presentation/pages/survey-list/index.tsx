import React from 'react';
import { MainHeader, PageWrapper } from '@/presentation/components';

import Styles from './styles.scss';

const SurveyList: React.FC = () => {
  return (
    <PageWrapper header={<MainHeader />}>
      <div className={Styles.surveyListContainer}>
        <h2>Surveys</h2>
        <ul className={Styles.surveys}>
          <li className={Styles.surveyItem}>
            <time className={Styles.surveyTime}>
              <span className={Styles.surveyDay}>20</span>
              <span className={Styles.surveyMonth}>12</span>
              <span className={Styles.surveyYear}>2020</span>
            </time>
            <h3>What is your favorite framework duly do dole memem?</h3>
            <footer>See results</footer>
          </li>
          <li className={Styles.surveyItem}>
            <time className={Styles.surveyTime}>
              <span className={Styles.surveyDay}>20</span>
              <span className={Styles.surveyMonth}>12</span>
              <span className={Styles.surveyYear}>2020</span>
            </time>
            <h3>What is your favorite framework?</h3>
            <footer>See results</footer>
          </li>

          <li className={Styles.surveyItem}>
            <time className={Styles.surveyTime}>
              <span className={Styles.surveyDay}>20</span>
              <span className={Styles.surveyMonth}>12</span>
              <span className={Styles.surveyYear}>2020</span>
            </time>
            <h3>What is your favorite framework?</h3>
            <footer>See results</footer>
          </li>
        </ul>
      </div>
    </PageWrapper>
  );
};

export default SurveyList;
