(function () {
  'use strict';

  angular
    .module('templates')
    .controller('TemplatesListController', TemplatesListController);

  TemplatesListController.$inject = ['TemplatesService'];

  function TemplatesListController(TemplatesService) {
    var vm = this;

    vm.templates = TemplatesService.query();
  }
})();
