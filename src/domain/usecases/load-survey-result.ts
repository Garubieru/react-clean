export interface LoadSurveyResult {
  loadById: (id: string) => Promise<LoadSurveyResult.Model>;
}

export namespace LoadSurveyResult {
  export type Model = {
    question: string;
    answers: Array<{
      image: string;
      answer: string;
      count: number;
      percent: number;
      isCurrentAccountAnswer: boolean;
    }>;
    date: Date;
  };
}
