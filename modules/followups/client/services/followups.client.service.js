//Followups service used to communicate Followups REST endpoints
(function () {
  'use strict';

  angular
    .module('followups')
    .factory('FollowupsService', FollowupsService);

  FollowupsService.$inject = ['$resource'];

  function FollowupsService($resource) {
    return $resource('api/followups/:followupId', {
      followupId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
