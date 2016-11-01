(function () {
  'use strict';

  describe('Fieldworks Route Tests', function () {
    // Initialize global variables
    var $scope,
      FieldworksService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _FieldworksService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      FieldworksService = _FieldworksService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('fieldworks');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/fieldworks');
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
          FieldworksController,
          mockFieldwork;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('fieldworks.view');
          $templateCache.put('modules/fieldworks/client/views/view-fieldwork.client.view.html', '');

          // create mock Fieldwork
          mockFieldwork = new FieldworksService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Fieldwork Name'
          });

          //Initialize Controller
          FieldworksController = $controller('FieldworksController as vm', {
            $scope: $scope,
            fieldworkResolve: mockFieldwork
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:fieldworkId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.fieldworkResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            fieldworkId: 1
          })).toEqual('/fieldworks/1');
        }));

        it('should attach an Fieldwork to the controller scope', function () {
          expect($scope.vm.fieldwork._id).toBe(mockFieldwork._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/fieldworks/client/views/view-fieldwork.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          FieldworksController,
          mockFieldwork;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('fieldworks.create');
          $templateCache.put('modules/fieldworks/client/views/form-fieldwork.client.view.html', '');

          // create mock Fieldwork
          mockFieldwork = new FieldworksService();

          //Initialize Controller
          FieldworksController = $controller('FieldworksController as vm', {
            $scope: $scope,
            fieldworkResolve: mockFieldwork
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.fieldworkResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/fieldworks/create');
        }));

        it('should attach an Fieldwork to the controller scope', function () {
          expect($scope.vm.fieldwork._id).toBe(mockFieldwork._id);
          expect($scope.vm.fieldwork._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/fieldworks/client/views/form-fieldwork.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          FieldworksController,
          mockFieldwork;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('fieldworks.edit');
          $templateCache.put('modules/fieldworks/client/views/form-fieldwork.client.view.html', '');

          // create mock Fieldwork
          mockFieldwork = new FieldworksService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Fieldwork Name'
          });

          //Initialize Controller
          FieldworksController = $controller('FieldworksController as vm', {
            $scope: $scope,
            fieldworkResolve: mockFieldwork
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:fieldworkId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.fieldworkResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            fieldworkId: 1
          })).toEqual('/fieldworks/1/edit');
        }));

        it('should attach an Fieldwork to the controller scope', function () {
          expect($scope.vm.fieldwork._id).toBe(mockFieldwork._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/fieldworks/client/views/form-fieldwork.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
