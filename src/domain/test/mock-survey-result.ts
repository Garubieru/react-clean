import { LoadSurveyResult } from '@/domain/usecases';
import faker from 'faker';

export const mockSurveyResult = (): LoadSurveyResult.Model => ({
  date: faker.date.recent(),
  question: faker.random.words(),
  answers: [
    {
      answer: faker.random.words(),
      image: faker.random.image(),
      count: faker.datatype.number(),
      percent: faker.datatype.number(100),
      isCurrentAccountAnswer: faker.datatype.boolean(),
    },
    {
      answer: faker.random.words(),
      image: faker.random.image(),
      count: faker.datatype.number(),
      percent: faker.datatype.number(100),
      isCurrentAccountAnswer: faker.datatype.boolean(),
    },
  ],
});
