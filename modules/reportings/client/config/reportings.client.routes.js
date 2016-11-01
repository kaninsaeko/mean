(function () {
  'use strict';

  angular
    .module('reportings')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('reportings', {
        abstract: true,
        url: '/reportings',
        template: '<ui-view/>'
      })
      .state('reportings.list', {
        url: '',
        templateUrl: 'modules/reportings/client/views/list-reportings.client.view.html',
        controller: 'ReportingsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Reportings List'
        }
      })
      .state('reportings.create', {
        url: '/create',
        templateUrl: 'modules/reportings/client/views/form-reporting.client.view.html',
        controller: 'ReportingsController',
        controllerAs: 'vm',
        resolve: {
          reportingResolve: newReporting
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Reportings Create'
        }
      })
      .state('reportings.edit', {
        url: '/:reportingId/edit',
        templateUrl: 'modules/reportings/client/views/form-reporting.client.view.html',
        controller: 'ReportingsController',
        controllerAs: 'vm',
        resolve: {
          reportingResolve: getReporting
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Reporting {{ reportingResolve.name }}'
        }
      })
      .state('reportings.view', {
        url: '/:reportingId',
        templateUrl: 'modules/reportings/client/views/view-reporting.client.view.html',
        controller: 'ReportingsController',
        controllerAs: 'vm',
        resolve: {
          reportingResolve: getReporting
        },
        data:{
          pageTitle: 'Reporting {{ articleResolve.name }}'
        }
      });
  }

  getReporting.$inject = ['$stateParams', 'ReportingsService'];

  function getReporting($stateParams, ReportingsService) {
    return ReportingsService.get({
      reportingId: $stateParams.reportingId
    }).$promise;
  }

  newReporting.$inject = ['ReportingsService'];

  function newReporting(ReportingsService) {
    return new ReportingsService();
  }
})();
