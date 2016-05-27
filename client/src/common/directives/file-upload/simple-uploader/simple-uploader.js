angular.module('elementBoxApp.common')

.directive('simpleUploader', [function() {

  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      onSuccessItem: '=',
      onCompleteItem: '=',
      onAfterAddingFile: '='
    },
    templateUrl: 'directives/file-upload/simple-uploader/simple-uploader.html',
    // controller: 'simpleUploaderController'
    controller: ['$scope', '$timeout', 'FileUploader', function($scope, $timeout, FileUploader) {

      var uploader = $scope.uploader = new FileUploader({
        url: '/upload',
        queueLimit: 1,
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

      uploader.onSuccessItem = function(fileItem, response, status, headers) {
        fileItem.url = response.path;
        if (angular.isFunction($scope.onSuccessItem)) {
          $scope.onSuccessItem.apply(this, arguments);
        }
        uploader.clearQueue();
      };

      uploader.onAfterAddingFile = function(fileItem) {
        if (angular.isFunction($scope.onAfterAddingFile)) {
          $scope.onAfterAddingFile.apply(this, arguments);
        }
        uploader.uploadAll();
      };

      uploader.onCompleteItem = function(fileItem, response, status, headers) {
        if (angular.isFunction($scope.onCompleteItem)) {
          $scope.onCompleteItem.apply(this, arguments);
        }
      };

    }]
  };

}]);
