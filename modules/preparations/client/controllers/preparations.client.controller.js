(function () {
  'use strict';

  // Preparations controller
  angular
    .module('preparations')
    .controller('PreparationsController', PreparationsController);

  PreparationsController.$inject = ['$scope', '$state', 'Authentication', 'preparationResolve'];

  function PreparationsController ($scope, $state, Authentication, preparation) {
    var vm = this;

    vm.authentication = Authentication;
    vm.preparation = preparation;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Preparation
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.preparation.$remove($state.go('preparations.list'));
      }
    }

    // Save Preparation
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.preparationForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.preparation._id) {
        vm.preparation.$update(successCallback, errorCallback);
      } else {
        vm.preparation.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('preparations.view', {
          preparationId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
