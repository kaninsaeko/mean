(function () {
  'use strict';

  describe('Auditprojects Route Tests', function () {
    // Initialize global variables
    var $scope,
      AuditprojectsService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _AuditprojectsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      AuditprojectsService = _AuditprojectsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('auditprojects');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/auditprojects');
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
          AuditprojectsController,
          mockAuditproject;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('auditprojects.view');
          $templateCache.put('modules/auditprojects/client/views/view-auditproject.client.view.html', '');

          // create mock Auditproject
          mockAuditproject = new AuditprojectsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Auditproject Name'
          });

          //Initialize Controller
          AuditprojectsController = $controller('AuditprojectsController as vm', {
            $scope: $scope,
            auditprojectResolve: mockAuditproject
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:auditprojectId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.auditprojectResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            auditprojectId: 1
          })).toEqual('/auditprojects/1');
        }));

        it('should attach an Auditproject to the controller scope', function () {
          expect($scope.vm.auditproject._id).toBe(mockAuditproject._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/auditprojects/client/views/view-auditproject.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          AuditprojectsController,
          mockAuditproject;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('auditprojects.create');
          $templateCache.put('modules/auditprojects/client/views/form-auditproject.client.view.html', '');

          // create mock Auditproject
          mockAuditproject = new AuditprojectsService();

          //Initialize Controller
          AuditprojectsController = $controller('AuditprojectsController as vm', {
            $scope: $scope,
            auditprojectResolve: mockAuditproject
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.auditprojectResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/auditprojects/create');
        }));

        it('should attach an Auditproject to the controller scope', function () {
          expect($scope.vm.auditproject._id).toBe(mockAuditproject._id);
          expect($scope.vm.auditproject._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/auditprojects/client/views/form-auditproject.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          AuditprojectsController,
          mockAuditproject;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('auditprojects.edit');
          $templateCache.put('modules/auditprojects/client/views/form-auditproject.client.view.html', '');

          // create mock Auditproject
          mockAuditproject = new AuditprojectsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Auditproject Name'
          });

          //Initialize Controller
          AuditprojectsController = $controller('AuditprojectsController as vm', {
            $scope: $scope,
            auditprojectResolve: mockAuditproject
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:auditprojectId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.auditprojectResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            auditprojectId: 1
          })).toEqual('/auditprojects/1/edit');
        }));

        it('should attach an Auditproject to the controller scope', function () {
          expect($scope.vm.auditproject._id).toBe(mockAuditproject._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/auditprojects/client/views/form-auditproject.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
