(function () {
  'use strict';

  describe('Followups Route Tests', function () {
    // Initialize global variables
    var $scope,
      FollowupsService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _FollowupsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      FollowupsService = _FollowupsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('followups');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/followups');
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
          FollowupsController,
          mockFollowup;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('followups.view');
          $templateCache.put('modules/followups/client/views/view-followup.client.view.html', '');

          // create mock Followup
          mockFollowup = new FollowupsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Followup Name'
          });

          //Initialize Controller
          FollowupsController = $controller('FollowupsController as vm', {
            $scope: $scope,
            followupResolve: mockFollowup
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:followupId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.followupResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            followupId: 1
          })).toEqual('/followups/1');
        }));

        it('should attach an Followup to the controller scope', function () {
          expect($scope.vm.followup._id).toBe(mockFollowup._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/followups/client/views/view-followup.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          FollowupsController,
          mockFollowup;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('followups.create');
          $templateCache.put('modules/followups/client/views/form-followup.client.view.html', '');

          // create mock Followup
          mockFollowup = new FollowupsService();

          //Initialize Controller
          FollowupsController = $controller('FollowupsController as vm', {
            $scope: $scope,
            followupResolve: mockFollowup
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.followupResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/followups/create');
        }));

        it('should attach an Followup to the controller scope', function () {
          expect($scope.vm.followup._id).toBe(mockFollowup._id);
          expect($scope.vm.followup._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/followups/client/views/form-followup.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          FollowupsController,
          mockFollowup;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('followups.edit');
          $templateCache.put('modules/followups/client/views/form-followup.client.view.html', '');

          // create mock Followup
          mockFollowup = new FollowupsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Followup Name'
          });

          //Initialize Controller
          FollowupsController = $controller('FollowupsController as vm', {
            $scope: $scope,
            followupResolve: mockFollowup
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:followupId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.followupResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            followupId: 1
          })).toEqual('/followups/1/edit');
        }));

        it('should attach an Followup to the controller scope', function () {
          expect($scope.vm.followup._id).toBe(mockFollowup._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/followups/client/views/form-followup.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
