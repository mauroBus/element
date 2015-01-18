angular.module('elementBoxApp.common')

.directive('fileUpload', [function() {

    return {
      restrict: 'EA',
      scope: {
        files: '=', // Array of resulting file paths after uploading (Read only).
        limit: '=', // File limit.
        uploaded: '=' // (read only) [Boolean] Either all images has been uploaded.
      },
      templateUrl: 'directives/file-upload/file-upload.html',
      controller: 'fileUploadController'
    };

  }
]);
