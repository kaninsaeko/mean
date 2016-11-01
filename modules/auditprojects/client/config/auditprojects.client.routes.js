(function () {
  'use strict';

  angular
    .module('auditprojects')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('auditprojects', {
        abstract: true,
        url: '/auditprojects',
        template: '<ui-view/>'
      })
      .state('auditprojects.list', {
        url: '',
        templateUrl: 'modules/auditprojects/client/views/list-auditprojects.client.view.html',
        controller: 'AuditprojectsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Auditprojects List'
        }
      })
      .state('auditprojects.create', {
        url: '/create',
        templateUrl: 'modules/auditprojects/client/views/form-auditproject.client.view.html',
        controller: 'AuditprojectsController',
        controllerAs: 'vm',
        resolve: {
          auditprojectResolve: newAuditproject
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Auditprojects Create'
        }
      })
      .state('auditprojects.edit', {
        url: '/:auditprojectId/edit',
        templateUrl: 'modules/auditprojects/client/views/form-auditproject.client.view.html',
        controller: 'AuditprojectsController',
        controllerAs: 'vm',
        resolve: {
          auditprojectResolve: getAuditproject
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Auditproject {{ auditprojectResolve.name }}'
        }
      })
      .state('auditprojects.view', {
        url: '/:auditprojectId',
        templateUrl: 'modules/auditprojects/client/views/view-auditproject.client.view.html',
        controller: 'AuditprojectsController',
        controllerAs: 'vm',
        resolve: {
          auditprojectResolve: getAuditproject
        },
        data:{
          pageTitle: 'Auditproject {{ articleResolve.name }}'
        }
      });
  }

  getAuditproject.$inject = ['$stateParams', 'AuditprojectsService'];

  function getAuditproject($stateParams, AuditprojectsService) {
    return AuditprojectsService.get({
      auditprojectId: $stateParams.auditprojectId
    }).$promise;
  }

  newAuditproject.$inject = ['AuditprojectsService'];

  function newAuditproject(AuditprojectsService) {
    return new AuditprojectsService();
  }
})();
