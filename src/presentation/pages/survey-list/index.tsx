import React, { useEffect, useState } from 'react';
import { LoadSurveyList } from '@/domain/usecases';
import { MainHeader, PageWrapper, ReloadError } from '@/presentation/components';
import {
  SurveyContext,
  SurveyItems,
  SurveyState,
} from '@/presentation/pages/survey-list/components';
import { useErrorHandler } from '@/presentation/hooks';
import Styles from './styles.scss';

type SurveyListProps = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<SurveyListProps> = ({ loadSurveyList }) => {
  const [surveyScreenState, setSurveyScreenState] = useState<SurveyState>({
    surveyItems: [],
    error: '',
    reload: false,
  });

  const handleError = useErrorHandler((error) =>
    setSurveyScreenState((state) => ({ ...state, error: error.message })),
  );

  const handleReload = (): void => {
    setSurveyScreenState((state) => ({
      error: '',
      surveyItems: [],
      reload: !state.reload,
    }));
  };

  useEffect(() => {
    const listSurveys = async (): Promise<void> => {
      try {
        const items = await loadSurveyList.list();
        setSurveyScreenState((state) => ({ ...state, surveyItems: items }));
      } catch (error) {
        handleError(error);
      }
    };

    listSurveys();
  }, [surveyScreenState.reload]);

  return (
    <PageWrapper header={<MainHeader />}>
      <div className={Styles.surveyListContainer}>
        <h2>Surveys</h2>
        <SurveyContext.Provider value={{ surveyScreenState, setSurveyScreenState }}>
          {!surveyScreenState.error ? (
            <SurveyItems />
          ) : (
            <ReloadError handleReload={handleReload} error={surveyScreenState.error} />
          )}
        </SurveyContext.Provider>
      </div>
    </PageWrapper>
  );
};

export default SurveyList;
