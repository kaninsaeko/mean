(function () {
  'use strict';

  angular
    .module('auditprojects')
    .controller('AuditprojectsListController', AuditprojectsListController);

  AuditprojectsListController.$inject = ['AuditprojectsService'];

  function AuditprojectsListController(AuditprojectsService) {
    var vm = this;

    vm.auditprojects = AuditprojectsService.query();
  }
})();
