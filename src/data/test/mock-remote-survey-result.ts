import faker from 'faker';
import { RemoteLoadSurveyResult } from '@/data/usecases';

export const mockRemoteSurveyResult = (): RemoteLoadSurveyResult.Model => {
  const mockAnswers = (): any => ({
    answer: faker.random.words(),
    count: faker.datatype.number(),
    image: faker.random.image(),
    isCurrentAccountAnswer: faker.datatype.boolean(),
    percent: faker.datatype.number(),
  });

  return {
    question: faker.random.words(),
    date: faker.date.recent().toISOString(),
    answers: [mockAnswers(), mockAnswers()],
  };
};
