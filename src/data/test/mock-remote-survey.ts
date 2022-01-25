import faker from 'faker';
import { RemoteLoadSurveyList } from '@/data/usecases';

export const mockRemoteSurvey = (): RemoteLoadSurveyList.Model => {
  return {
    id: faker.datatype.uuid(),
    didAnswer: faker.datatype.boolean(),
    date: faker.date.recent().toISOString(),
    question: faker.random.words(),
  };
};

export const mockRemoteSurveyList = (
  length: number = 5,
): RemoteLoadSurveyList.Model[] => {
  return Array.from({ length }, () => mockRemoteSurvey());
};
