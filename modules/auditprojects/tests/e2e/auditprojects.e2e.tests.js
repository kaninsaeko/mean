'use strict';

describe('Auditprojects E2E Tests:', function () {
  describe('Test Auditprojects page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/auditprojects');
      expect(element.all(by.repeater('auditproject in auditprojects')).count()).toEqual(0);
    });
  });
});
