import React from 'react';
import Styles from './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';

type ReloadErrorProps = {
  handleReload: () => void;
  error: string;
};

const ReloadError: React.FC<ReloadErrorProps> = (props) => {
  return (
    <div className={Styles.errorWrap} data-testid="error-wrap">
      <button onClick={props.handleReload} data-testid="reload-button">
        <FontAwesomeIcon icon={faRedoAlt}></FontAwesomeIcon>
      </button>
      <span>{props.error}</span>
    </div>
  );
};

export default ReloadError;
