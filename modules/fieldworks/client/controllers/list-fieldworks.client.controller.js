(function () {
  'use strict';

  angular
    .module('fieldworks')
    .controller('FieldworksListController', FieldworksListController);

  FieldworksListController.$inject = ['Authentication','FileUploader','$timeout', '$window', '$scope','StatusesService','FieldworksService','AuditprogramsService','ProjectsService'];

  function FieldworksListController(Authentication,FileUploader,$timeout, $window, $scope,StatusesService,FieldworksService,AuditprogramsService,ProjectsService) {
    var vm = this;
    $scope.authentication = Authentication;
    vm.auditprograms = AuditprogramsService.query();
    vm.fieldworks = FieldworksService.query();
    vm.statuses = StatusesService.query();
    vm.projects = ProjectsService.query();
    $scope.imageURL = $scope.profileImageURL;
    $scope.uploader= new FileUploader({
      url: '/api/fieldworks/up',
      alias: 'newUploadImg'
    });

    // Set file uploader image filter
    $scope.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // Called after the user has successfully uploaded a new picture
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;

      // Populate user object
      $scope.user = Authentication.user = response;

      // Clear upload buttons
      $scope.cancelUpload();
    };


    $scope.uploadProfilePicture = function () {
      // Clear messages
      $scope.success = $scope.error = null;

      // Start upload
      console.log($scope.uploader.queue);
      $scope.uploader.uploadAll();
    };

    // Cancel the upload process
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();
      $scope.imageURL = $scope.profileImageURL;
    };

    
    $scope.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            $scope.imageURL = fileReaderEvent.target.result;
            
          }, 0);
        };
      }
    };


    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      $scope.cancelUpload();

      // Show error message
      $scope.error = response.message;
    };

    // CALLBACKS

        $scope.uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        
        $scope.uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        $scope.uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        $scope.uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        $scope.uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
       
        $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        $scope.uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        $scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        $scope.uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };


    $scope.editfw = function(auditprogramId,a1,a2,a3){
      var auditpg = new AuditprogramsService();
      console.log(auditprogramId);
      console.log(a1);
      console.log(a2);
      console.log(a3);
      auditpg._id = auditprogramId;
      auditpg.projectname = a1;
      auditpg.process = a2;
      auditpg.subprocess = a3;      
      $scope.auditpg = [];

      auditpg.$update(function(response){
        $scope.vm.auditprograms.push(response);

      });      
    }

    $scope.addstatus = function(a1,a2,a3){
      var status = new StatusesService();
      status.auditprogram_id = a1;
      status.remark = a2;
      status.status = a3;
      $scope.status = [];

      status.$save(function(response){
        $scope.vm.statuses.push(response);

      });      
    }

  }
})();
