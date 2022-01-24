import React from 'react';
import { useSurveyContext } from '@/presentation/pages/survey-list/components';

import Styles from './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';

const SurveyError: React.FC = () => {
  const { surveyScreenState, setSurveyScreenState } = useSurveyContext();
  const handleReload = (): void => {
    setSurveyScreenState((state) => ({
      error: '',
      surveyItems: [],
      reload: !state.reload,
    }));
  };
  return (
    <div className={Styles.errorWrap} data-testid="error-wrap">
      <button onClick={handleReload} data-testid="reload-button">
        <FontAwesomeIcon icon={faRedoAlt}></FontAwesomeIcon>
      </button>
      <span>{surveyScreenState.error}</span>
    </div>
  );
};

export default SurveyError;
