//Uploadimgs service used to communicate Uploadimgs REST endpoints
(function () {
  'use strict';

  angular
    .module('uploadimgs')
    .factory('UploadimgsService', UploadimgsService);

  UploadimgsService.$inject = ['$resource'];

  function UploadimgsService($resource) {
    return $resource('api/uploadimgs/:uploadimgId', {
      uploadimgId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
