//Fieldworks service used to communicate Fieldworks REST endpoints
(function () {
  'use strict';

  angular
    .module('fieldworks')
    .factory('FieldworksService', FieldworksService);

  FieldworksService.$inject = ['$resource'];

  function FieldworksService($resource) {
    return $resource('api/fieldworks/:fieldworkId', {
      fieldworkId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
