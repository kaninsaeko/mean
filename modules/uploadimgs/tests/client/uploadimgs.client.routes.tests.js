(function () {
  'use strict';

  describe('Uploadimgs Route Tests', function () {
    // Initialize global variables
    var $scope,
      UploadimgsService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _UploadimgsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      UploadimgsService = _UploadimgsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('uploadimgs');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/uploadimgs');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          UploadimgsController,
          mockUploadimg;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('uploadimgs.view');
          $templateCache.put('modules/uploadimgs/client/views/view-uploadimg.client.view.html', '');

          // create mock Uploadimg
          mockUploadimg = new UploadimgsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Uploadimg Name'
          });

          //Initialize Controller
          UploadimgsController = $controller('UploadimgsController as vm', {
            $scope: $scope,
            uploadimgResolve: mockUploadimg
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:uploadimgId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.uploadimgResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            uploadimgId: 1
          })).toEqual('/uploadimgs/1');
        }));

        it('should attach an Uploadimg to the controller scope', function () {
          expect($scope.vm.uploadimg._id).toBe(mockUploadimg._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/uploadimgs/client/views/view-uploadimg.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          UploadimgsController,
          mockUploadimg;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('uploadimgs.create');
          $templateCache.put('modules/uploadimgs/client/views/form-uploadimg.client.view.html', '');

          // create mock Uploadimg
          mockUploadimg = new UploadimgsService();

          //Initialize Controller
          UploadimgsController = $controller('UploadimgsController as vm', {
            $scope: $scope,
            uploadimgResolve: mockUploadimg
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.uploadimgResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/uploadimgs/create');
        }));

        it('should attach an Uploadimg to the controller scope', function () {
          expect($scope.vm.uploadimg._id).toBe(mockUploadimg._id);
          expect($scope.vm.uploadimg._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/uploadimgs/client/views/form-uploadimg.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          UploadimgsController,
          mockUploadimg;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('uploadimgs.edit');
          $templateCache.put('modules/uploadimgs/client/views/form-uploadimg.client.view.html', '');

          // create mock Uploadimg
          mockUploadimg = new UploadimgsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Uploadimg Name'
          });

          //Initialize Controller
          UploadimgsController = $controller('UploadimgsController as vm', {
            $scope: $scope,
            uploadimgResolve: mockUploadimg
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:uploadimgId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.uploadimgResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            uploadimgId: 1
          })).toEqual('/uploadimgs/1/edit');
        }));

        it('should attach an Uploadimg to the controller scope', function () {
          expect($scope.vm.uploadimg._id).toBe(mockUploadimg._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/uploadimgs/client/views/form-uploadimg.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
