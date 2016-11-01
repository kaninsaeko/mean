(function () {
  'use strict';

  angular
    .module('setups')
    .controller('SetupsListController', SetupsListController);

  SetupsListController.$inject = ['SetupsService'];

  function SetupsListController(SetupsService) {
    var vm = this;

    vm.setups = SetupsService.query();
  }
})();
