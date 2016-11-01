(function () {
  'use strict';

  angular
    .module('auditprograms')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('auditprograms', {
        abstract: true,
        url: '/auditprograms',
        template: '<ui-view/>'
      })
      .state('auditprograms.list', {
        url: '',
        templateUrl: 'modules/auditprograms/client/views/list-auditprograms.client.view.html',
        controller: 'AuditprogramsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Auditprograms List'
        }
      })
      
      .state('auditprograms.create', {
        url: '/create',
        templateUrl: 'modules/auditprograms/client/views/form-auditprogram.client.view.html',
        controller: 'AuditprogramsController',
        controllerAs: 'vm',
        resolve: {
          auditprogramResolve: newAuditprogram
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Auditprograms Create'
        }
      })
      .state('auditprograms.edit', {
        url: '/:auditprogramId/edit',
        templateUrl: 'modules/auditprograms/client/views/form-auditprogram.client.view.html',
        controller: 'AuditprogramsController',
        controllerAs: 'vm',
        resolve: {
          auditprogramResolve: getAuditprogram
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Auditprogram {{ auditprogramResolve.name }}'
        }
      })
      .state('auditprograms.view', {
        url: '/:auditprogramId',
        templateUrl: 'modules/auditprograms/client/views/view-auditprogram.client.view.html',
        controller: 'AuditprogramsController',
        controllerAs: 'vm',
        resolve: {
          auditprogramResolve: getAuditprogram
        },
        data:{
          pageTitle: 'Auditprogram {{ articleResolve.name }}'
        }
      });
  }

  getAuditprogram.$inject = ['$stateParams', 'AuditprogramsService'];

  function getAuditprogram($stateParams, AuditprogramsService) {
    return AuditprogramsService.get({
      auditprogramId: $stateParams.auditprogramId
    }).$promise;
  }

  newAuditprogram.$inject = ['AuditprogramsService'];

  function newAuditprogram(AuditprogramsService) {
    return new AuditprogramsService();
  }
})();
