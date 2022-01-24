import React from 'react';
import { useSurveyContext } from '@/presentation/pages/survey-list/components';
import Styles from './styles.scss';

const SurveyError: React.FC = () => {
  const { surveyScreenState } = useSurveyContext();
  return (
    <div className={Styles.errorWrap} data-testid="error-wrap">
      <span>{surveyScreenState.error}</span>
      <button>Reload</button>
    </div>
  );
};

export default SurveyError;
