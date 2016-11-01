(function () {
  'use strict';

  angular
    .module('preparations')
    .controller('PreparationsListController', PreparationsListController);

  PreparationsListController.$inject = ['PreparationsService'];

  function PreparationsListController(PreparationsService) {
    var vm = this;

    vm.preparations = PreparationsService.query();
  }
})();
