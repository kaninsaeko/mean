(function () {
  'use strict';

  angular
    .module('statuses')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('statuses', {
        abstract: true,
        url: '/statuses',
        template: '<ui-view/>'
      })
      .state('statuses.list', {
        url: '',
        templateUrl: 'modules/statuses/client/views/list-statuses.client.view.html',
        controller: 'StatusesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Statuses List'
        }
      })
      .state('statuses.create', {
        url: '/create',
        templateUrl: 'modules/statuses/client/views/form-status.client.view.html',
        controller: 'StatusesController',
        controllerAs: 'vm',
        resolve: {
          statusResolve: newStatus
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Statuses Create'
        }
      })
      .state('statuses.edit', {
        url: '/:statusId/edit',
        templateUrl: 'modules/statuses/client/views/form-status.client.view.html',
        controller: 'StatusesController',
        controllerAs: 'vm',
        resolve: {
          statusResolve: getStatus
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Status {{ statusResolve.name }}'
        }
      })
      .state('statuses.view', {
        url: '/:statusId',
        templateUrl: 'modules/statuses/client/views/view-status.client.view.html',
        controller: 'StatusesController',
        controllerAs: 'vm',
        resolve: {
          statusResolve: getStatus
        },
        data:{
          pageTitle: 'Status {{ articleResolve.name }}'
        }
      });
  }

  getStatus.$inject = ['$stateParams', 'StatusesService'];

  function getStatus($stateParams, StatusesService) {
    return StatusesService.get({
      statusId: $stateParams.statusId
    }).$promise;
  }

  newStatus.$inject = ['StatusesService'];

  function newStatus(StatusesService) {
    return new StatusesService();
  }
})();
