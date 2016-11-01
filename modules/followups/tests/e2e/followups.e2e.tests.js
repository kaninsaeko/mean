'use strict';

describe('Followups E2E Tests:', function () {
  describe('Test Followups page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/followups');
      expect(element.all(by.repeater('followup in followups')).count()).toEqual(0);
    });
  });
});
