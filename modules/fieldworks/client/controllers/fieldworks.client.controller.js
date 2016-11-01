(function () {
  'use strict';

  // Fieldworks controller
  angular
    .module('fieldworks')
    .controller('FieldworksController', FieldworksController);

  FieldworksController.$inject = ['$scope', '$state', 'Authentication', 'fieldworkResolve','AuditprogramsService'];

  function FieldworksController ($scope, $state, Authentication, fieldwork, AuditprogramsService) {
    var vm = this;
    vm.auditprograms = AuditprogramsService.query();
    vm.authentication = Authentication;
    vm.fieldwork = fieldwork;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    

    // Remove existing Fieldwork
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.fieldwork.$remove($state.go('fieldworks.list'));
      }
    }

    // Save Fieldwork
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.fieldworkForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.fieldwork._id) {
        vm.fieldwork.$update(successCallback, errorCallback);
      } else {
        vm.fieldwork.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('fieldworks.view', {
          fieldworkId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
