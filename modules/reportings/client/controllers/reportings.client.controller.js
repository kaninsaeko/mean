(function () {
  'use strict';

  // Reportings controller
  angular
    .module('reportings')
    .controller('ReportingsController', ReportingsController);

  ReportingsController.$inject = ['$scope', '$state', 'Authentication', 'reportingResolve'];

  function ReportingsController ($scope, $state, Authentication, reporting) {
    var vm = this;

    vm.authentication = Authentication;
    vm.reporting = reporting;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Reporting
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.reporting.$remove($state.go('reportings.list'));
      }
    }

    // Save Reporting
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.reportingForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.reporting._id) {
        vm.reporting.$update(successCallback, errorCallback);
      } else {
        vm.reporting.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('reportings.view', {
          reportingId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
