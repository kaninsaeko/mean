//Templates service used to communicate Templates REST endpoints
(function () {
  'use strict';

  angular
    .module('templates')
    .factory('TemplatesService', TemplatesService);

  TemplatesService.$inject = ['$resource'];

  function TemplatesService($resource) {
    return $resource('api/templates/:templateId', {
      templateId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
