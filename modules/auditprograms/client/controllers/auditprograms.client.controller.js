(function () {
  'use strict';




  // Auditprograms controller
  angular
    .module('auditprograms')
    
    .controller('AuditprogramsController', AuditprogramsController);

  AuditprogramsController.$inject = ['$scope', '$state', 'Authentication', 'auditprogramResolve','ProjectsService','AuditprogramsService'];

  function AuditprogramsController ($scope, $state, Authentication, auditprogram,ProjectsService,AuditprogramsService) {
    var vm = this;

    vm.projects = ProjectsService.query();
  
    vm.auditprograms = AuditprogramsService.query();
    //vm.count = "A";
    //vm.auditprogram.projectname = "B";
    vm.authentication = Authentication;
    vm.auditprogram = auditprogram;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    

    // Remove existing Auditprogram
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.auditprogram.$remove($state.go('auditprograms.list'));
      }
    }

    // Save Auditprogram
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.auditprogramForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.auditprogram._id) {
        vm.auditprogram.$update(successCallback, errorCallback);
      } else {
        vm.auditprogram.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        //$state.go('auditprograms.view', {
        $state.go('projects.view', {
          projectId: projectId
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
