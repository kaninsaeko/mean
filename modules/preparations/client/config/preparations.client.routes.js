(function () {
  'use strict';

  angular
    .module('preparations')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('preparations', {
        abstract: true,
        url: '/preparations',
        template: '<ui-view/>'
      })
      .state('preparations.list', {
        url: '',
        templateUrl: 'modules/projects/client/views/list-projects.client.view.html',
        controller: 'ProjectsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Projects List'
        }
      })
      .state('preparations.create', {
        url: '/create',
        templateUrl: 'modules/preparations/client/views/form-preparation.client.view.html',
        controller: 'PreparationsController',
        controllerAs: 'vm',
        resolve: {
          preparationResolve: newPreparation
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Preparations Create'
        }
      })
      .state('preparations.edit', {
        url: '/:preparationId/edit',
        templateUrl: 'modules/preparations/client/views/form-preparation.client.view.html',
        controller: 'PreparationsController',
        controllerAs: 'vm',
        resolve: {
          preparationResolve: getPreparation
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Preparation {{ preparationResolve.name }}'
        }
      })
      .state('preparations.view', {
        url: '/:preparationId',
        templateUrl: 'modules/preparations/client/views/view-preparation.client.view.html',
        controller: 'PreparationsController',
        controllerAs: 'vm',
        resolve: {
          preparationResolve: getPreparation
        },
        data:{
          pageTitle: 'Preparation {{ articleResolve.name }}'
        }
      });
  }

  getPreparation.$inject = ['$stateParams', 'PreparationsService'];

  function getPreparation($stateParams, PreparationsService) {
    return PreparationsService.get({
      preparationId: $stateParams.preparationId
    }).$promise;
  }

  newPreparation.$inject = ['PreparationsService'];

  function newPreparation(PreparationsService) {
    return new PreparationsService();
  }
})();
