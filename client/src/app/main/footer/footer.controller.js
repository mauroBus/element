
angular.module('elementBoxApp.main')

.controller('FooterCtrl', ['$scope', '$translate', '$timeout', function($scope, $translate, $timeout) {

  $scope.supportedLangs = [
    {
      name: 'FOOTER.SPANISH',
      key: 'es'
    },
    {
      name: 'FOOTER.ENGLISH',
      key: 'en'
    }
  ];

  var langHash = {
    'es': $scope.supportedLangs[0],
    'en': $scope.supportedLangs[1],
  };

  var setCurrentLang = function() {
    $scope.langSelected = langHash[$translate.use()];
  };

  $scope.onChangeLang = function(lang) {
    $translate.use(lang.key);
  };

  $timeout(setCurrentLang, 500);

}]);
