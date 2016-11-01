'use strict';

describe('Auditprograms E2E Tests:', function () {
  describe('Test Auditprograms page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/auditprograms');
      expect(element.all(by.repeater('auditprogram in auditprograms')).count()).toEqual(0);
    });
  });
});
