
angular.module('elementBoxApp.common')

.factory('ngProgressService', ['ngProgressFactory', function(ngProgressFactory) {

  var ngProgress = ngProgressFactory.createInstance();
  ngProgress.setHeight('8px');
  ngProgress.setColor('');

  var start = ngProgress.start;
  var complete = ngProgress.complete;

  ngProgress.start = function() {
    angular.element('#progress-back').css('display', 'block');
    start.call(ngProgress);
  };

  ngProgress.complete = function() {
    angular.element('#progress-back').css('display', 'none');
    complete.call(ngProgress);
  };

  return ngProgress;

}]);
