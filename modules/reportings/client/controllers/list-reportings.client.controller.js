(function () {
  'use strict';

  angular
    .module('reportings')
    .controller('ReportingsListController', ReportingsListController);

  ReportingsListController.$inject = ['ReportingsService'];

  function ReportingsListController(ReportingsService) {
    var vm = this;

    vm.reportings = ReportingsService.query();
  }
})();
