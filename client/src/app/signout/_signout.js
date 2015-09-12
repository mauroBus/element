angular.module('elementBoxApp.signout', [])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.signout', {
      url: '/signout',
      templateUrl: 'signout/signout.html',
      controller: 'signoutCtrl'
    });
  }
])

.controller('signoutCtrl', [
        '$scope', '$rootScope', '$state', 'Session',
function($scope,   $rootScope,   $state,   Session) {
  $rootScope.$emit('title', 'TITLE_SIGN_OUT');

  if (Session.getSession() && Session.getSession().user) {
    $state.go('main.home');
    return;
  }

  var mouseBinding;

  $rootScope.$emit('app-msg', { txt: 'YOU_ARE_LOGGED_OUT' });

  var mouse = function() {
    var $scene = window.$('.scene'),
        sceneAtts = {},
        $magic = window.$('.magic'),
        magicWHalf = $magic.width() / 2;

    sceneAtts = $scene.offset();
    sceneAtts.w = $scene.outerWidth();
    sceneAtts.h = $scene.outerHeight();

    mouseBinding = window.$(document).on('mousemove', function(e) {
      if (
          e.pageX < sceneAtts.left || e.pageX > sceneAtts.left + sceneAtts.w ||
          e.pageY < sceneAtts.top || e.pageY > sceneAtts.top + sceneAtts.h
        ) {
        $magic.css({
          left: 'calc(50% - 10rem)',
          top: 'calc(50% - 10rem)'
        });
        return;
      }

      $magic.css({
        left: e.pageX - magicWHalf,
        top: e.pageY - magicWHalf * 2 - 40,
        // left: e.offsetX - magicWHalf - 3,
        // top: e.offsetY - magicWHalf * 2 - 30,
        display: ''
      });
      // $magic.clientX = e.clientX - magicWHalf;
      // $magic.clientY = e.clientY - magicWHalf;
    });
  };

  setTimeout(mouse, 1500);

  // $scope.$on('destroy', function() {
  //   if (mouseBinding) {
  //     mouseBinding();
  //   }
  // });
}]);
