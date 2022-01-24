import React, { useEffect, useState } from 'react';
import { LoadSurveyList } from '@/domain/usecases';
import { SurveyModel } from '@/domain/models';
import { MainHeader, PageWrapper } from '@/presentation/components';
import {
  SurveyContext,
  SurveyItems,
  SurveyError,
} from '@/presentation/pages/survey-list/components';
import Styles from './styles.scss';

type SurveyListProps = {
  loadSurveyList: LoadSurveyList;
};

type SurveyState = {
  surveyItems: SurveyModel[];
  error: string;
};

const SurveyList: React.FC<SurveyListProps> = ({ loadSurveyList }) => {
  const [surveyScreenState, setSurveyScreenState] = useState<SurveyState>({
    surveyItems: [],
    error: '',
  });

  useEffect(() => {
    const listSurveys = async (): Promise<void> => {
      try {
        const items = await loadSurveyList.list();
        setSurveyScreenState((state) => ({ ...state, surveyItems: items }));
      } catch (e) {
        const error = e as Error;
        setSurveyScreenState((state) => ({ ...state, error: error.message }));
      }
    };

    listSurveys();
  }, []);

  return (
    <PageWrapper header={<MainHeader />}>
      <div className={Styles.surveyListContainer}>
        <h2>Surveys</h2>
        <SurveyContext.Provider value={{ surveyScreenState, setSurveyScreenState }}>
          {!surveyScreenState.error ? <SurveyItems /> : <SurveyError />}
        </SurveyContext.Provider>
      </div>
    </PageWrapper>
  );
};

export default SurveyList;
