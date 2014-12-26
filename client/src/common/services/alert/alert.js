
angular.module('elementBoxApp.common')

.factory('ModalAlert', ['Element', '$rootScope', '$modal', 'ErrorHandler',
  function(Element, $rootScope, $modal, ErrorHandler) {
    var AlertModal = {}, modalInstance;

    AlertModal.listen = function() {
      $rootScope.$on('modal:alert', function(event, msg) {
        modalInstance = $modal.open({
          templateUrl: 'services/alert/alert.html',
          controller: function($scope) {
            $scope.ok = function () {
              modalInstance.close();
            };
            $scope.cancel = function () {
              modalInstance.dismiss();
            };
            $scope.msg = ErrorHandler.translate(msg);
          },
          size: 'sm',
          backdrop: true
        });
      });
    };

    return AlertModal;
  }
]);
