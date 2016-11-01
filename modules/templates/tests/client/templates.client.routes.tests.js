(function () {
  'use strict';

  describe('Templates Route Tests', function () {
    // Initialize global variables
    var $scope,
      TemplatesService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _TemplatesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      TemplatesService = _TemplatesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('templates');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/templates');
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
          TemplatesController,
          mockTemplate;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('templates.view');
          $templateCache.put('modules/templates/client/views/view-template.client.view.html', '');

          // create mock Template
          mockTemplate = new TemplatesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Template Name'
          });

          //Initialize Controller
          TemplatesController = $controller('TemplatesController as vm', {
            $scope: $scope,
            templateResolve: mockTemplate
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:templateId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.templateResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            templateId: 1
          })).toEqual('/templates/1');
        }));

        it('should attach an Template to the controller scope', function () {
          expect($scope.vm.template._id).toBe(mockTemplate._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/templates/client/views/view-template.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          TemplatesController,
          mockTemplate;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('templates.create');
          $templateCache.put('modules/templates/client/views/form-template.client.view.html', '');

          // create mock Template
          mockTemplate = new TemplatesService();

          //Initialize Controller
          TemplatesController = $controller('TemplatesController as vm', {
            $scope: $scope,
            templateResolve: mockTemplate
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.templateResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/templates/create');
        }));

        it('should attach an Template to the controller scope', function () {
          expect($scope.vm.template._id).toBe(mockTemplate._id);
          expect($scope.vm.template._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/templates/client/views/form-template.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          TemplatesController,
          mockTemplate;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('templates.edit');
          $templateCache.put('modules/templates/client/views/form-template.client.view.html', '');

          // create mock Template
          mockTemplate = new TemplatesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Template Name'
          });

          //Initialize Controller
          TemplatesController = $controller('TemplatesController as vm', {
            $scope: $scope,
            templateResolve: mockTemplate
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:templateId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.templateResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            templateId: 1
          })).toEqual('/templates/1/edit');
        }));

        it('should attach an Template to the controller scope', function () {
          expect($scope.vm.template._id).toBe(mockTemplate._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/templates/client/views/form-template.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
