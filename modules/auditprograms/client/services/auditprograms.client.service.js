//Auditprograms service used to communicate Auditprograms REST endpoints
(function () {
  'use strict';

  angular
    .module('auditprograms')
    .factory('AuditprogramsService', AuditprogramsService);

  AuditprogramsService.$inject = ['$resource'];

  function AuditprogramsService($resource) {
    return $resource('api/auditprograms/:auditprogramId', {
      auditprogramId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
      
    });
  }
})();
