import { LoadSurveyList } from '@/domain/usecases';
import { mockSurveyList } from '@/domain/test';

export class LoadSurveyListStub implements LoadSurveyList {
  constructor(public surveyItemsLength: number = 5) {}

  callsCount = 0;
  surveyList = mockSurveyList(this.surveyItemsLength);

  async list(): Promise<LoadSurveyList.Model[]> {
    this.callsCount++;
    return await Promise.resolve(this.surveyList);
  }
}
