export const testSurvey = (
  index: number,
  question: string,
  day: string,
  month: string,
  year: string,
  didAnswer: boolean,
): void => {
  cy.getByTestId('surveys-list')
    .children()
    .eq(index)
    .within((li) => {
      assert.equal(li.find('[data-testid="survey-day"]').text(), day);
      assert.equal(li.find('[data-testid="survey-month"]').text(), month);
      assert.equal(li.find('[data-testid="survey-year"]').text(), year);
      assert.equal(li.find('[data-testid="survey-question"]').text(), question);
      cy.fixture('icons').then((icon) => {
        assert.equal(
          li.find('[data-testid="icon-image"]').attr('src'),
          didAnswer ? icon.thumbsUp : icon.thumbsDown,
        );
      });
    });
};
