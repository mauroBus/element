
angular.module('elementBoxApp.userdetails', [])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.userdetails', {
      url: '/userdetails/:id',
      templateUrl: 'userdetails/userdetails.html',
      controller: 'UserDetailsCtrl'
    });
  }
])


// Filter to partialy hide phone number:
.filter('hidePhone', function() {
  return function(input) {
    return input ? new Array(input.length - 2).join('▒') + input.substr(input.length - 2) : '';
  };
})
;
