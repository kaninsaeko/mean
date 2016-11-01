(function () {
  'use strict';

  angular
    .module('followups')
    .controller('FollowupsListController', FollowupsListController);

  FollowupsListController.$inject = ['FollowupsService'];

  function FollowupsListController(FollowupsService) {
    var vm = this;

    vm.followups = FollowupsService.query();
  }
})();
