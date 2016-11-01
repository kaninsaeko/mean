(function () {
  'use strict';

  angular
    .module('followups')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('followups', {
        abstract: true,
        url: '/followups',
        template: '<ui-view/>'
      })
      .state('followups.list', {
        url: '',
        templateUrl: 'modules/followups/client/views/list-followups.client.view.html',
        controller: 'FollowupsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Followups List'
        }
      })
      .state('followups.create', {
        url: '/create',
        templateUrl: 'modules/followups/client/views/form-followup.client.view.html',
        controller: 'FollowupsController',
        controllerAs: 'vm',
        resolve: {
          followupResolve: newFollowup
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Followups Create'
        }
      })
      .state('followups.edit', {
        url: '/:followupId/edit',
        templateUrl: 'modules/followups/client/views/form-followup.client.view.html',
        controller: 'FollowupsController',
        controllerAs: 'vm',
        resolve: {
          followupResolve: getFollowup
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Followup {{ followupResolve.name }}'
        }
      })
      .state('followups.view', {
        url: '/:followupId',
        templateUrl: 'modules/followups/client/views/view-followup.client.view.html',
        controller: 'FollowupsController',
        controllerAs: 'vm',
        resolve: {
          followupResolve: getFollowup
        },
        data:{
          pageTitle: 'Followup {{ articleResolve.name }}'
        }
      });
  }

  getFollowup.$inject = ['$stateParams', 'FollowupsService'];

  function getFollowup($stateParams, FollowupsService) {
    return FollowupsService.get({
      followupId: $stateParams.followupId
    }).$promise;
  }

  newFollowup.$inject = ['FollowupsService'];

  function newFollowup(FollowupsService) {
    return new FollowupsService();
  }
})();
