import { mockSurveyResult } from '@/domain/test';
import { LoadSurveyResult } from '@/domain/usecases';

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0;
  surveyResult = mockSurveyResult();
  async load(): Promise<LoadSurveyResult.Model> {
    this.callsCount++;
    return this.surveyResult;
  }
}
