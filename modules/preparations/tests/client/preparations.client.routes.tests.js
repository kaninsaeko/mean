(function () {
  'use strict';

  describe('Preparations Route Tests', function () {
    // Initialize global variables
    var $scope,
      PreparationsService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _PreparationsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      PreparationsService = _PreparationsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('preparations');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/preparations');
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
          PreparationsController,
          mockPreparation;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('preparations.view');
          $templateCache.put('modules/preparations/client/views/view-preparation.client.view.html', '');

          // create mock Preparation
          mockPreparation = new PreparationsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Preparation Name'
          });

          //Initialize Controller
          PreparationsController = $controller('PreparationsController as vm', {
            $scope: $scope,
            preparationResolve: mockPreparation
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:preparationId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.preparationResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            preparationId: 1
          })).toEqual('/preparations/1');
        }));

        it('should attach an Preparation to the controller scope', function () {
          expect($scope.vm.preparation._id).toBe(mockPreparation._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/preparations/client/views/view-preparation.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          PreparationsController,
          mockPreparation;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('preparations.create');
          $templateCache.put('modules/preparations/client/views/form-preparation.client.view.html', '');

          // create mock Preparation
          mockPreparation = new PreparationsService();

          //Initialize Controller
          PreparationsController = $controller('PreparationsController as vm', {
            $scope: $scope,
            preparationResolve: mockPreparation
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.preparationResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/preparations/create');
        }));

        it('should attach an Preparation to the controller scope', function () {
          expect($scope.vm.preparation._id).toBe(mockPreparation._id);
          expect($scope.vm.preparation._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/preparations/client/views/form-preparation.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          PreparationsController,
          mockPreparation;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('preparations.edit');
          $templateCache.put('modules/preparations/client/views/form-preparation.client.view.html', '');

          // create mock Preparation
          mockPreparation = new PreparationsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Preparation Name'
          });

          //Initialize Controller
          PreparationsController = $controller('PreparationsController as vm', {
            $scope: $scope,
            preparationResolve: mockPreparation
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:preparationId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.preparationResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            preparationId: 1
          })).toEqual('/preparations/1/edit');
        }));

        it('should attach an Preparation to the controller scope', function () {
          expect($scope.vm.preparation._id).toBe(mockPreparation._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/preparations/client/views/form-preparation.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
