(function () {
  'use strict';

  angular
    .module('uploadimgs')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('uploadimgs', {
        abstract: true,
        url: '/uploadimgs',
        template: '<ui-view/>'
      })
      .state('uploadimgs.list', {
        url: '',
        templateUrl: 'modules/uploadimgs/client/views/list-uploadimgs.client.view.html',
        controller: 'UploadimgsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Uploadimgs List'
        }
      })
      .state('uploadimgs.create', {
        url: '/create',
        templateUrl: 'modules/uploadimgs/client/views/form-uploadimg.client.view.html',
        controller: 'UploadimgsController',
        controllerAs: 'vm',
        resolve: {
          uploadimgResolve: newUploadimg
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Uploadimgs Create'
        }
      })
      .state('uploadimgs.edit', {
        url: '/:uploadimgId/edit',
        templateUrl: 'modules/uploadimgs/client/views/form-uploadimg.client.view.html',
        controller: 'UploadimgsController',
        controllerAs: 'vm',
        resolve: {
          uploadimgResolve: getUploadimg
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Uploadimg {{ uploadimgResolve.name }}'
        }
      })
      .state('uploadimgs.view', {
        url: '/:uploadimgId',
        templateUrl: 'modules/uploadimgs/client/views/view-uploadimg.client.view.html',
        controller: 'UploadimgsController',
        controllerAs: 'vm',
        resolve: {
          uploadimgResolve: getUploadimg
        },
        data:{
          pageTitle: 'Uploadimg {{ articleResolve.name }}'
        }
      });
  }

  getUploadimg.$inject = ['$stateParams', 'UploadimgsService'];

  function getUploadimg($stateParams, UploadimgsService) {
    return UploadimgsService.get({
      uploadimgId: $stateParams.uploadimgId
    }).$promise;
  }

  newUploadimg.$inject = ['UploadimgsService'];

  function newUploadimg(UploadimgsService) {
    return new UploadimgsService();
  }
})();
