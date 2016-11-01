'use strict';

describe('Fieldworks E2E Tests:', function () {
  describe('Test Fieldworks page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/fieldworks');
      expect(element.all(by.repeater('fieldwork in fieldworks')).count()).toEqual(0);
    });
  });
});
