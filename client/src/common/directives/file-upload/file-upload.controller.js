angular.module('elementBoxApp.common')

.controller('fileUploadController', ['$scope', '$timeout', 'FileUploader', function($scope, $timeout, FileUploader) {

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

  // CALLBACKS:
  uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
    // console.info('onWhenAddingFileFailed', item, filter, options);
  };
  uploader.onAfterAddingFile = function(fileItem) {
    var index = uploader.queue.indexOf(fileItem);
    fileItem.url = '/upload';
    $scope.files[index] = { url: '', isUploaded: false };
    // console.info('onAfterAddingFile', fileItem);
  };
  uploader.onAfterAddingAll = function(addedFileItems) {
    // console.info('onAfterAddingAll', addedFileItems);
  };
  uploader.onBeforeUploadItem = function(item) {
    // console.info('onBeforeUploadItem', item);
  };
  uploader.onProgressItem = function(fileItem, progress) {
    // console.info('onProgressItem', fileItem, progress);
  };
  uploader.onProgressAll = function(progress) {
    // console.info('onProgressAll', progress);
  };
  uploader.onSuccessItem = function(fileItem, response, status, headers) {
    // console.info('onSuccessItem', fileItem, response, status, headers);
  };
  uploader.onErrorItem = function(fileItem, response, status, headers) {
    // console.info('onErrorItem', fileItem, response, status, headers);
  };
  uploader.onCancelItem = function(fileItem, response, status, headers) {
    // console.info('onCancelItem', fileItem, response, status, headers);
  };
  uploader.onCompleteItem = function(fileItem, response, status, headers) {
    var index = uploader.queue.indexOf(fileItem);
    $scope.files[index].url = response.path;
    $scope.files[index].isUploaded = true;
    // $scope.files.push({url: response.path});
    // console.info('onCompleteItem', fileItem, response, status, headers);
  };
  uploader.onCompleteAll = function() {
    // console.info('onCompleteAll');
  };

  var swap = function(array, from, to) {
    // array.splice(to, 0, array.splice(from, 1)[0]);
    var elem = array[from];
    array.splice(from, 1);
    array.splice(to, 0, elem);
  };

  $scope.swapQueue = function(from, to) {
    console.log(from);
    console.log(to);
    swap(uploader.queue, from, to);
    swap($scope.files, from, to);
  };

  $scope.removeItem = function(item, index) {
    item.remove();
    // uploader.queue.splice(index, 1);
    $scope.files.splice(index, 1);
  };

}]);
