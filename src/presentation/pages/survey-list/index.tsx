import React, { useEffect, useState } from 'react';
import { LoadSurveyList } from '@/domain/usecases';
import { MainHeader, PageWrapper } from '@/presentation/components';
import {
  SurveyContext,
  SurveyItems,
  SurveyError,
  SurveyState,
} from '@/presentation/pages/survey-list/components';
import Styles from './styles.scss';
import { ForbiddenError } from '@/domain/errors';
import { useApi } from '@/presentation/context/api/api-context';
import { useNavigate } from 'react-router-dom';

type SurveyListProps = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<SurveyListProps> = ({ loadSurveyList }) => {
  const [surveyScreenState, setSurveyScreenState] = useState<SurveyState>({
    surveyItems: [],
    error: '',
    reload: false,
  });
  const { setLoginAccount } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    const listSurveys = async (): Promise<void> => {
      try {
        const items = await loadSurveyList.list();
        setSurveyScreenState((state) => ({ ...state, surveyItems: items }));
      } catch (e) {
        if (e instanceof ForbiddenError) {
          setLoginAccount(null);
          navigate('/login');
          return;
        }
        const error = e as Error;
        setSurveyScreenState((state) => ({ ...state, error: error.message }));
      }
    };

    listSurveys();
  }, [surveyScreenState.reload]);

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
