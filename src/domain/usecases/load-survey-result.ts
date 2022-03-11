export interface LoadSurveyResult {
  load: () => Promise<LoadSurveyResult.Model>;
}

export namespace LoadSurveyResult {
  export type Model = {
    question: string;
    answers: LoadSurveyResult.AnswerModel[];
    date: Date;
  };

  export type AnswerModel = {
    image?: string;
    answer: string;
    count: number;
    percent: number;
    isCurrentAccountAnswer: boolean;
  };
}
