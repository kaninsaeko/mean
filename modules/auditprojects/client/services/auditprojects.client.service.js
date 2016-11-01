//Auditprojects service used to communicate Auditprojects REST endpoints
(function () {
  'use strict';

  angular
    .module('auditprojects')
    .factory('AuditprojectsService', AuditprojectsService);

  AuditprojectsService.$inject = ['$resource'];

  function AuditprojectsService($resource) {
    return $resource('api/auditprojects/:auditprojectId', {
      auditprojectId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
