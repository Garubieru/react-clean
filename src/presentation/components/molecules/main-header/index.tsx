import React, { memo } from 'react';
import { useRecoilValue } from 'recoil';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Logo } from '@/presentation/components';
import { loginApiState } from '@/presentation/context/api/api-state';
import { useLogout } from '@/presentation/hooks';
import Styles from './styles.scss';

const MainHeader: React.FC = () => {
  const logout = useLogout();
  const { getLoginAccount } = useRecoilValue(loginApiState);
  const { name } = getLoginAccount();

  const handleSignout = (e: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
    e.preventDefault();
    e.stopPropagation();
    logout();
  };

  return (
    <header className={Styles.mainHeader}>
      <Logo className={Styles.navLogo} />
      <div className={Styles.userContainerHeader}>
        <p className={Styles.userName} data-testid="user-name">
          {name}
        </p>
        <FontAwesomeIcon className={Styles.userIcon} icon={faUserCircle} />
        <div className={Styles.userOptionsContainer}>
          <ul className={Styles.userOptionsList}>
            <li
              data-testid="signout-link"
              className={Styles.userOptionsItem}
              onClick={handleSignout}
            >
              <a href="/login">Signout</a>
              <FontAwesomeIcon className={Styles.optionIcon} icon={faSignOutAlt} />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default memo(MainHeader);
