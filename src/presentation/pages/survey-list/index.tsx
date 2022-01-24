import React, { useEffect, useState } from 'react';
import { MainHeader, PageWrapper } from '@/presentation/components';
import { SurveyItem } from './components';
import Styles from './styles.scss';
import { LoadSurveyList } from '@/domain/usecases';
import { SurveyModel } from '@/domain/models';

type SurveyListProps = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<SurveyListProps> = ({ loadSurveyList }) => {
  const [surveyScreen, setSurveyScreen] = useState({
    surveyItems: [] as SurveyModel[],
    error: '',
  });

  useEffect(() => {
    const listSurveys = async (): Promise<void> => {
      try {
        const items = await loadSurveyList.list();
        setSurveyScreen((state) => ({ ...state, surveyItems: items }));
      } catch (e) {
        const error = e as Error;
        setSurveyScreen((state) => ({ ...state, error: error.message }));
      }
    };

    listSurveys();
  }, []);

  return (
    <PageWrapper header={<MainHeader />}>
      <div className={Styles.surveyListContainer}>
        <h2>Surveys</h2>
        {!surveyScreen.error && (
          <ul className={Styles.surveys} data-testid="surveys-list">
            {surveyScreen.surveyItems.length === 0 ? (
              <>
                <SurveyItem className={Styles.survey} loading />
                <SurveyItem className={Styles.survey} loading />
                <SurveyItem className={Styles.survey} loading />
                <SurveyItem className={Styles.survey} loading />
              </>
            ) : (
              <>
                {surveyScreen.surveyItems.map((surveyItem) => (
                  <SurveyItem key={surveyItem.id} surveyData={surveyItem} />
                ))}
                S
              </>
            )}
          </ul>
        )}
        {surveyScreen.error && (
          <div data-testid="error-wrap">
            <span>{surveyScreen.error}</span>
            <button>Reload</button>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default SurveyList;
