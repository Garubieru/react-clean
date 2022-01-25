import React, { memo } from 'react';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Logo } from '@/presentation/components';
import Styles from './styles.scss';
import { useApi } from '@/presentation/context/api/api-context';
import { useNavigate } from 'react-router-dom';

const MainHeader: React.FC = () => {
  const { setLoginAccount, getLoginAccount } = useApi();
  const { name } = getLoginAccount();
  const navigate = useNavigate();
  const handleSignout = (e: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
    e.preventDefault();
    e.stopPropagation();
    setLoginAccount(null);
    navigate('/login');
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
