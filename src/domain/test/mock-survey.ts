import faker from 'faker';
import { SurveyModel, SurveyAnswers } from '@/domain/models';

export const mockSurvey = (answerLength: number = 2): SurveyModel => {
  const mockAnswer = (): SurveyAnswers => {
    return {
      image: faker.random.image(),
      answer: faker.random.words(),
    };
  };
  return {
    id: faker.datatype.uuid(),
    didAnswer: faker.datatype.boolean(),
    answers: Array.from({ length: answerLength }, mockAnswer),
    date: faker.date.recent(),
    question: faker.random.words(),
  };
};

export const mockSurveyList = (
  length: number = 5,
  answerLength?: number,
): SurveyModel[] => {
  return Array.from({ length }, () => mockSurvey(answerLength));
};
