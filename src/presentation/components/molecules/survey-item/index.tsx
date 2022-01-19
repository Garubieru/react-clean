import React from 'react';
import Styles from './styles.scss';
import { SurveyIconStatus, IconStatus } from '@/presentation/components';

type SurveyItemProps = {
  className?: string;
  loading?: boolean;
};

const SurveyItem: React.FC<SurveyItemProps> = (props) => {
  return (
    <li className={[Styles.surveyItem, props.className].join(' ')}>
      {!props.loading && (
        <>
          <SurveyIconStatus className={Styles.iconWrap} iconName={IconStatus.thumsDown} />
          <div className={Styles.surveyContent}>
            <time className={Styles.surveyTime}>
              <span className={Styles.surveyDay}>20</span>
              <span className={Styles.surveyMonth}>12</span>
              <span className={Styles.surveyYear}>2020</span>
            </time>
            <h3>What is your favorite framework duly do dole memem?</h3>
          </div>
          <footer>See results</footer>
        </>
      )}
    </li>
  );
};

export default SurveyItem;
