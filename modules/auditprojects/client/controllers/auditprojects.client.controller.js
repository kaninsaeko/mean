(function () {
  'use strict';

  // Auditprojects controller
  angular
    .module('auditprojects')
    .controller('AuditprojectsController', AuditprojectsController);

  AuditprojectsController.$inject = ['$scope', '$state', 'Authentication', 'auditprojectResolve'];

  function AuditprojectsController ($scope, $state, Authentication, auditproject) {
    var vm = this;

    vm.authentication = Authentication;
    vm.auditproject = auditproject;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Auditproject
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.auditproject.$remove($state.go('auditprojects.list'));
      }
    }

    // Save Auditproject
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.auditprojectForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.auditproject._id) {
        vm.auditproject.$update(successCallback, errorCallback);
      } else {
        vm.auditproject.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('auditprojects.view', {
          auditprojectId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
