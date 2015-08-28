
angular.module('elementBoxApp.products.productInfo')

.directive('contact', function() {
  return {
    restrict: 'E',
    templateUrl: 'products/product-info/contact/contact-segment.html',
    transclude: true,
    scope: {
      product: '='
    },
    controller: ['$scope', 'ProductsService', function($scope, ProductsService) {
      $scope.checkinDate = null;
      $scope.checkoutDate = null;

      $scope.checkinOpened = false;
      $scope.checkoutOpened = false;

      $scope.contactSent = false;

      $scope.checkinMinDate = new Date();
      $scope.checkoutMinDate = new Date();

      $scope.commentText = '';

      $scope.doContact = function() {
        ProductsService.contact({
            _id: $scope.product._id,
            checkinDate: $scope.checkinDate,
            checkoutDate: $scope.checkoutDate,
            commentText: $scope.commentText
          })
          .$promise.then(function() {
            $scope.contactSent = true;
          });
      };

      $scope.openCheckin = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.checkinOpened = true;
        $scope.checkoutOpened = false;
      };

      $scope.openCheckout = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.checkinOpened = false;
        $scope.checkoutOpened = true;
      };

      // Disable weekend selection
      $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
      };

      $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1,
        closeText: 'Close',
        showButtonBar: 'false',
        showWeeks: 'false'
      };

    }]
  };
});
