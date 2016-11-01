'use strict';

describe('Reportings E2E Tests:', function () {
  describe('Test Reportings page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/reportings');
      expect(element.all(by.repeater('reporting in reportings')).count()).toEqual(0);
    });
  });
});
