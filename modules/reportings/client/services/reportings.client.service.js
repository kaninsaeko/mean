//Reportings service used to communicate Reportings REST endpoints
(function () {
  'use strict';

  angular
    .module('reportings')
    .factory('ReportingsService', ReportingsService);

  ReportingsService.$inject = ['$resource'];

  function ReportingsService($resource) {
    return $resource('api/reportings/:reportingId', {
      reportingId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
