import faker from 'faker';
import { LoadSurveyList } from '@/domain/usecases';

export const mockSurvey = (): LoadSurveyList.Model => {
  return {
    id: faker.datatype.uuid(),
    didAnswer: faker.datatype.boolean(),
    date: faker.date.recent(),
    question: faker.random.words(),
  };
};

export const mockSurveyList = (length: number = 5): LoadSurveyList.Model[] => {
  return Array.from({ length }, () => mockSurvey());
};
