(function () {
  'use strict';

  // Uploadimgs controller
  angular
    .module('uploadimgs')
    .controller('UploadimgsController', UploadimgsController);

  UploadimgsController.$inject = ['$timeout', '$window', '$scope', '$state', 'Authentication', 'uploadimgResolve','FileUploader'];

  function UploadimgsController ($timeout, $window, $scope, $state, Authentication, uploadimg, FileUploader) {
    var vm = this;

    vm.authentication = Authentication;
    vm.uploadimg = uploadimg;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;


    $scope.imageURL = $scope.profileImageURL;
    
    $scope.uploader= new FileUploader({
      url: '/api/uploadimgs/create',
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
      //console.log($scope.FileItem + 'AAAAAAAAAAAAAAAAAAAAAAA');
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


    // Remove existing Uploadimg
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.uploadimg.$remove($state.go('uploadimgs.list'));
      }
    }

    // Save Uploadimg
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.uploadimgForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.uploadimg._id) {
        vm.uploadimg.$update(successCallback, errorCallback);
      } else {
        vm.uploadimg.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('uploadimgs.view', {
          uploadimgId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
