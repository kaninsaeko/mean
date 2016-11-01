(function () {
  'use strict';

  angular
    .module('templates')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('templates', {
        abstract: true,
        url: '/templates',
        template: '<ui-view/>'
      })
      .state('templates.list', {
        url: '',
        templateUrl: 'modules/templates/client/views/list-templates.client.view.html',
        controller: 'TemplatesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Templates List'
        }
      })
      .state('templates.create', {
        url: '/create',
        templateUrl: 'modules/templates/client/views/form-template.client.view.html',
        controller: 'TemplatesController',
        controllerAs: 'vm',
        resolve: {
          templateResolve: newTemplate
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Templates Create'
        }
      })
      .state('templates.edit', {
        url: '/:templateId/edit',
        templateUrl: 'modules/templates/client/views/form-template.client.view.html',
        controller: 'TemplatesController',
        controllerAs: 'vm',
        resolve: {
          templateResolve: getTemplate
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Template {{ templateResolve.name }}'
        }
      })
      .state('templates.view', {
        url: '/:templateId',
        templateUrl: 'modules/templates/client/views/view-template.client.view.html',
        controller: 'TemplatesController',
        controllerAs: 'vm',
        resolve: {
          templateResolve: getTemplate
        },
        data:{
          pageTitle: 'Template {{ articleResolve.name }}'
        }
      });
  }

  getTemplate.$inject = ['$stateParams', 'TemplatesService'];

  function getTemplate($stateParams, TemplatesService) {
    return TemplatesService.get({
      templateId: $stateParams.templateId
    }).$promise;
  }

  newTemplate.$inject = ['TemplatesService'];

  function newTemplate(TemplatesService) {
    return new TemplatesService();
  }
})();
