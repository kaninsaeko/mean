'use strict';

describe('Preparations E2E Tests:', function () {
  describe('Test Preparations page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/preparations');
      expect(element.all(by.repeater('preparation in preparations')).count()).toEqual(0);
    });
  });
});
