(function () {
  'use strict';

  angular
    .module('uploadimgs')
    .controller('UploadimgsListController', UploadimgsListController);

  UploadimgsListController.$inject = ['UploadimgsService'];

  function UploadimgsListController(UploadimgsService) {
    var vm = this;

    vm.uploadimgs = UploadimgsService.query();
  }
})();
