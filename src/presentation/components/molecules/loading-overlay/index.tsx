import React from 'react';
import Styles from './styles.scss';
import { Spinner } from '@/presentation/components';

const LoadingOverlay: React.FC = () => {
  return (
    <div data-testid="loading-overlay" className={Styles.loadingOverlay}>
      <div className={Styles.loadingContainer}>
        <span>Please, wait...</span>
        <Spinner className={Styles.surveySpinner} />
      </div>
    </div>
  );
};

export default LoadingOverlay;
