(function () {
  'use strict';

  // Projects controller
  angular
    .module('projects')
    .controller('ProjectsController', ProjectsController);


  ProjectsController.$inject = ['$http','$scope', '$state', 'Authentication', 'projectResolve','AuditprogramsService','TemplatesService'];
  function ProjectsController ($http,$scope, $state, Authentication, project,AuditprogramsService,TemplatesService) {
    var vm = this;
    vm.auditprograms = AuditprogramsService.query();
    vm.templates = TemplatesService.query();
    vm.authentication = Authentication;
    vm.project = project;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    
    
    
    
  

    

    // Remove existing Project
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.project.$remove($state.go('projects.list'));
      }
    }

    // Save Project
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.projectForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.project._id) {
        vm.project.$update(successCallback, errorCallback);
      } else {
        vm.project.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('projects.view', {
          projectId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    $scope.addauditpg = function(a1,a2,a3,a4,a5,a6){
      var auditpg = new AuditprogramsService();
      auditpg.projectname = a1;
      auditpg.process = a2;
      auditpg.subprocess = a3;
      auditpg.processowner = a4;
      auditpg.detail = a5;
      auditpg.risklevel = a6;
      $scope.auditpg = [];

      auditpg.$save(function(response){
        $scope.vm.auditprograms.push(response);

      });      
    }

    $scope.deleteauditpg= function(auditprogramId,index)
    {
      var auditpg2 = new AuditprogramsService();
      //console.log(index);      
      //console.log(auditprogramId);
      auditpg2._id = auditprogramId;

      
        if (confirm('Are you sure you want to delete?')) 
        {
        //auditpg2.$remove($state.reload());
        auditpg2.$remove(function(){
        //$scope.vm.auditprograms.push(response);
        //console.log($scope.vm.auditprograms);
        var indexToDel = -1;
        for (var i=0; i < vm.auditprograms.length; ++i) {
         if (vm.auditprograms[i]._id === auditprogramId) {
          indexToDel = i;
        } 
      }
        if (~indexToDel) {
        $scope.vm.auditprograms.splice(indexToDel, 1); 
        } 
        //$scope.vm.auditprograms.splice(index,1);
        //$scope.vm.auditprograms.splice(response);
        
        

      });
        }    
    };
    $scope.tableSelection={};

    $scope.addtemplate= function(a1)
    {
      for (var i=0; i < vm.templates.length; ++i) 
        {
          if($scope.tableSelection[i]){

            console.log(vm.templates[i]._id);
            console.log(a1);
            console.log(vm.templates[i].process); 
            console.log(vm.templates[i].subprocess); 
            console.log(vm.templates[i].processowner); 
            console.log(vm.templates[i].detail); 
            console.log(vm.templates[i].risklevel);  

            var auditpg3 = new AuditprogramsService();
            auditpg3.projectname = a1;
            auditpg3.process = vm.templates[i].process;
            auditpg3.subprocess = vm.templates[i].subprocess;
            auditpg3.processowner = vm.templates[i].processowner;
            auditpg3.detail = vm.templates[i].detail;
            auditpg3.risklevel = vm.templates[i].risklevel;
            $scope.auditpg3 = [];

      auditpg3.$save(function(response){
        $scope.vm.auditprograms.push(response);

      });      
          }
        
        }


    };


  }
})();
