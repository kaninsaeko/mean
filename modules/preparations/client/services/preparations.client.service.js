//Preparations service used to communicate Preparations REST endpoints
(function () {
  'use strict';

  angular
    .module('preparations')
    .factory('PreparationsService', PreparationsService);

  PreparationsService.$inject = ['$resource'];

  function PreparationsService($resource) {
    return $resource('api/preparations/:preparationId', {
      preparationId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
