import React from 'react';
import { Logo, PageWrapper } from '@/presentation/components';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Styles from './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MainHeader: React.FC = () => {
  return (
    <header className={Styles.mainHeader}>
      <Logo className={Styles.navLogo} />
      <div className={Styles.userContainerHeader}>
        <p className={Styles.userName}>Gabriel Morishita</p>
        <FontAwesomeIcon className={Styles.userIcon} icon={faUserCircle} />
        <div className={Styles.userOptionsContainer}>
          <ul className={Styles.userOptionsList}>
            <li className={Styles.userOptionsItem}>
              <span>Signout</span>
              <FontAwesomeIcon className={Styles.optionIcon} icon={faSignOutAlt} />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

const SurveyList: React.FC = () => {
  return (
    <PageWrapper header={MainHeader}>
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
