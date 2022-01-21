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
  const [surveyItems, setSurveyItems] = useState<SurveyModel[]>([]);

  useEffect(() => {
    const listSurveys = async (): Promise<void> => {
      const items = await loadSurveyList.list();
      setSurveyItems(items);
    };

    listSurveys();
  });
  return (
    <PageWrapper header={<MainHeader />}>
      <div className={Styles.surveyListContainer}>
        <h2>Surveys</h2>
        <ul className={Styles.surveys} data-testid="surveys-list">
          {surveyItems.length === 0 ? (
            <>
              <SurveyItem className={Styles.survey} loading />
              <SurveyItem className={Styles.survey} loading />
              <SurveyItem className={Styles.survey} loading />
              <SurveyItem className={Styles.survey} loading />
            </>
          ) : (
            <>
              {surveyItems.map((surveyItem) => (
                <SurveyItem key={surveyItem.id} surveyData={surveyItem} />
              ))}
              S
            </>
          )}
        </ul>
      </div>
    </PageWrapper>
  );
};

export default SurveyList;
