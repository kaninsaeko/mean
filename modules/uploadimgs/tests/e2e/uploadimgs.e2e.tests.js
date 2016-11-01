'use strict';

describe('Uploadimgs E2E Tests:', function () {
  describe('Test Uploadimgs page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/uploadimgs');
      expect(element.all(by.repeater('uploadimg in uploadimgs')).count()).toEqual(0);
    });
  });
});
