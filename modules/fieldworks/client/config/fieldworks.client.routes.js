(function () {
  'use strict';

  angular
    .module('fieldworks')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('fieldworks', {
        abstract: true,
        url: '/fieldworks',
        template: '<ui-view/>'
      })
      .state('fieldworks.list', {
        url: '',
        templateUrl: 'modules/fieldworks/client/views/list-fieldworks.client.view.html',
        controller: 'FieldworksListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Fieldworks List'
        }
      })
      .state('fieldworks.create', {
        url: '/create',
        templateUrl: 'modules/fieldworks/client/views/form-fieldwork.client.view.html',
        controller: 'FieldworksController',
        controllerAs: 'vm',
        resolve: {
          fieldworkResolve: newFieldwork
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Fieldworks Create'
        }
      })
      .state('fieldworks.edit', {
        url: '/:fieldworkId/edit',
        templateUrl: 'modules/fieldworks/client/views/form-fieldwork.client.view.html',
        controller: 'FieldworksController',
        controllerAs: 'vm',
        resolve: {
          fieldworkResolve: getFieldwork
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Fieldwork {{ fieldworkResolve.name }}'
        }
      })
      .state('fieldworks.view', {
        url: '/:fieldworkId',
        templateUrl: 'modules/fieldworks/client/views/view-fieldwork.client.view.html',
        controller: 'FieldworksController',
        controllerAs: 'vm',
        resolve: {
          fieldworkResolve: getFieldwork
        },
        data:{
          pageTitle: 'Fieldwork {{ articleResolve.name }}'
        }
      });
  }

  getFieldwork.$inject = ['$stateParams', 'FieldworksService'];

  function getFieldwork($stateParams, FieldworksService) {
    return FieldworksService.get({
      fieldworkId: $stateParams.fieldworkId
    }).$promise;
  }

  newFieldwork.$inject = ['FieldworksService'];

  function newFieldwork(FieldworksService) {
    return new FieldworksService();
  }
})();
