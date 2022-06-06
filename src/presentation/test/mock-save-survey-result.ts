import { mockSurveyResult } from '@/domain/test';
import { SaveSurveyResult } from '@/domain/usecases';

export class SaveSurveyResultSpy implements SaveSurveyResult {
  params: SaveSurveyResult.Params;
  surveyResult = mockSurveyResult();
  callsCount = 0;
  async save(answer: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    this.params = answer;
    this.callsCount++;
    return this.surveyResult;
  }
}
