import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { LoadSurveyList } from '@/domain/usecases';
import { MainHeader, PageWrapper } from '@/presentation/components';
import { SurveyItems } from '@/presentation/pages/survey-list/components';
import { useErrorHandler } from '@/presentation/hooks';
import Styles from './styles.scss';
import { surveyListState, SurveyReloadError } from './components';

type SurveyListProps = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<SurveyListProps> = ({ loadSurveyList }) => {
  const [surveyScreenState, setSurveyScreenState] = useRecoilState(surveyListState);

  const handleError = useErrorHandler((error) =>
    setSurveyScreenState((state) => ({ ...state, error: error.message })),
  );

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
        {!surveyScreenState.error ? <SurveyItems /> : <SurveyReloadError />}
      </div>
    </PageWrapper>
  );
};

export default SurveyList;
