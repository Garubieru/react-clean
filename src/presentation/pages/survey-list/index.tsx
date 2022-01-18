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
      <h1>oi</h1>
      <h1>oi</h1>
      <h1>oi</h1>
      <h1>oi</h1>
    </PageWrapper>
  );
};

export default SurveyList;
