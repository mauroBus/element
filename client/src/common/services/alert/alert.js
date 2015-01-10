
angular.module('elementBoxApp.common')

.factory('ModalAlert', ['$rootScope', '$modal',
  function($rootScope, $modal) {
    var modalInstance, defaultConfig = {
      title: 'Woops!', // modal title.
      msg: 'A custom msg to display.', // modal msg.
      eventName: '', // event to listen to.
      parseMsgCbk: function(msg) { return msg; }, // placeholder to parse the msg before show the modal.
      hasCancel: false // whether or not to use cancel button.
    };

    var showModal = function(config) {
      modalInstance = $modal.open({
        templateUrl: 'services/alert/alert.html',
        controller: function($scope) {
          $scope.msg = (typeof config.parseMsgCbk === 'function') ? config.parseMsgCbk(config.msg) : config.msg;
          $scope.hasCancel = config.hasCancel;
          $scope.title = config.title;
        },
        size: 'sm',
        backdrop: 'static'
      });

      // returning the modal promise resolved when it's closed and rejected when it's dismissed.
      return modalInstance.result;
    };

    return {
      // Displays the modal when the "eventName" event is triggered on $rootScope.
      //  The message is gotten from the event.
      alertOn: function(config) {
        var conf = angular.extend({}, defaultConfig, config);
        $rootScope.$on(conf.eventName, function(event, msg) {
          conf.msg = msg;
          showModal(conf);
        });
      },
      // Displays inmediatly the modal according the configs.
      alert: function(config) {
        return showModal(angular.extend({}, defaultConfig, config));
      }
    };
  }
]);
