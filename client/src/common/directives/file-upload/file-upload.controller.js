angular.module('elementBoxApp.common')

.controller('fileUploadController', [
        '$scope', '$timeout', 'FileUploader',
function($scope,   $timeout,   FileUploader) {

  var uploader = $scope.uploader = new FileUploader({
    url: '/upload',
    queueLimit: $scope.limit || 10,
    alias: 'file'
  });

  // Filter by image type:
  uploader.filters.push({
    name: 'imageFilter',
    fn: function(item /*{File|FileLikeObject}*/, options) {
      var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
      return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    }
  });

  $scope.listeners = $scope.listeners || {};

  $scope.api = {
    uploader: uploader,
    uploadAll: uploader.uploadAll,
    getNotUploadedItems: uploader.getNotUploadedItems,
    cancelAll: uploader.cancelAll,
    isUploading: uploader.isUploading,
    clearQueue: uploader.clearQueue,
    progress: uploader.progress,
    queue: uploader.queue,
    isHTML5: uploader.isHTML5
  };

  $scope.trans = {
    limit: $scope.limit
  };

  $scope.$watch('files', function(oldVal, newVal) {
    if ($scope.files && $scope.files.length) {
      // Array.prototype.push.apply(uploader.queue, $scope.files);
      var clonedFile;

      $scope.files.forEach(function(fileObj) {
        clonedFile = angular.copy(fileObj);
        clonedFile.isUploaded = true;
        clonedFile.isReady = false;
        clonedFile.isSuccess = true;
        clonedFile.progress = 100;
        clonedFile.isUploading = false;
        clonedFile.isCancel = false;
        clonedFile.isError = false;
        clonedFile.classType = 'existing-image';
        clonedFile.upload = function() {};
        uploader.queue.push(clonedFile);
      });
      // uploader.queue = uploader.queue.concat($scope.files);
    }
  });


  // CALLBACKS:

  uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
    if (angular.isFunction($scope.listeners.onWhenAddingFileFailed)) {
      $scope.listeners.onWhenAddingFileFailed.apply(arguments);
    }
  };
  uploader.onAfterAddingFile = function(fileItem) {
    var index = uploader.queue.indexOf(fileItem);
    fileItem.url = '/upload';
    $scope.files[index] = { url: '', isUploaded: false };
    if (angular.isFunction($scope.listeners.onAfterAddingFile)) {
      $scope.listeners.onAfterAddingFile.apply(arguments);
    }
  };
  uploader.onAfterAddingAll = function(addedFileItems) {
    if (angular.isFunction($scope.listeners.onAfterAddingAll)) {
      $scope.listeners.onAfterAddingAll.apply(arguments);
    }
  };
  uploader.onBeforeUploadItem = function(item) {
    if (angular.isFunction($scope.listeners.onBeforeUploadItem)) {
      $scope.listeners.onBeforeUploadItem.apply(arguments);
    }
  };
  uploader.onProgressItem = function(fileItem, progress) {
    if (angular.isFunction($scope.listeners.onProgressItem)) {
      $scope.listeners.onProgressItem.apply(arguments);
    }
  };
  uploader.onProgressAll = function(progress) {
    if (angular.isFunction($scope.listeners.onProgressAll)) {
      $scope.listeners.onProgressAll.apply(arguments);
    }
  };
  uploader.onSuccessItem = function(fileItem, response, status, headers) {
    if (angular.isFunction($scope.listeners.onSuccessItem)) {
      $scope.listeners.onSuccessItem.apply(arguments);
    }
  };
  uploader.onErrorItem = function(fileItem, response, status, headers) {
    if (angular.isFunction($scope.listeners.onErrorItem)) {
      $scope.listeners.onErrorItem.apply(arguments);
    }
  };
  uploader.onCancelItem = function(fileItem, response, status, headers) {
    if (angular.isFunction($scope.listeners.onCancelItem)) {
      $scope.listeners.onCancelItem.apply(arguments);
    }
  };
  uploader.onCompleteItem = function(fileItem, response, status, headers) {
    var index = uploader.queue.indexOf(fileItem);
    $scope.files[index].url = response.path;
    $scope.files[index].isUploaded = true;
    // $scope.files.push({url: response.path});
    if (angular.isFunction($scope.listeners.onCompleteItem)) {
      $scope.listeners.onCompleteItem.apply(arguments);
    }
  };
  uploader.onCompleteAll = function() {
    if (angular.isFunction($scope.listeners.onCompleteAll)) {
      $scope.listeners.onCompleteAll.apply(arguments);
    }
  };

  var swap = function(array, from, to) {
    // array.splice(to, 0, array.splice(from, 1)[0]);
    var elem = array[from];
    array.splice(from, 1);
    array.splice(to, 0, elem);
  };

  $scope.swapQueue = function(from, to) {
    swap(uploader.queue, from, to);
    swap($scope.files, from, to);
  };

  $scope.removeItem = function(item, index) {
    if (item.remove) {
      item.remove();
    } else {
      uploader.queue.splice(index, 1);
    }
    $scope.files.splice(index, 1);
  };

}]);
