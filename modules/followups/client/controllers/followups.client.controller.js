(function () {
  'use strict';

  // Followups controller
  angular
    .module('followups')
    .controller('FollowupsController', FollowupsController);

  FollowupsController.$inject = ['$scope', '$state', 'Authentication', 'followupResolve'];

  function FollowupsController ($scope, $state, Authentication, followup) {
    var vm = this;

    vm.authentication = Authentication;
    vm.followup = followup;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Followup
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.followup.$remove($state.go('followups.list'));
      }
    }

    // Save Followup
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.followupForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.followup._id) {
        vm.followup.$update(successCallback, errorCallback);
      } else {
        vm.followup.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('followups.view', {
          followupId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
