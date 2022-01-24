import React from 'react';
import { useSurveyContext } from '@/presentation/pages/survey-list/components';
import Styles from './styles.scss';

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
      <span>{surveyScreenState.error}</span>
      <button onClick={handleReload} data-testid="reload-button">
        Try again
      </button>
    </div>
  );
};

export default SurveyError;
