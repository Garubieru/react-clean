import React, { memo } from 'react';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Logo } from '@/presentation/components';
import Styles from './styles.scss';

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

export default memo(MainHeader);
