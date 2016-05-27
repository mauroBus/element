
angular.module('elementBoxApp.products.productInfo')

.controller('ProductInfoCtrl', [
          '$scope', '$rootScope', '$state', '$stateParams', '$timeout', 'ModalAlert', 'ProductsService', 'UserService', 'CommentsService', 'EVENT_NAMES',
  function($scope,   $rootScope,   $state,   $stateParams,   $timeout,   ModalAlert,   ProductsService,   UserService,   CommentsService,   EVENT_NAMES) {
    $scope.slides = [];
    $scope.slidesIndex = 0;
    $scope.userHasRated = false;
    $scope.rateVal = null;
    $scope.newComment = '';
    $scope.commentSent = false;
    var ratingInProcess = false;

    $rootScope.$emit('title', 'TITLE_MY_PRODUCT_INFO');

    // Comments pagination:
    $scope.comments = [];
    $scope.commentsData = {
      page: 1,
      pageSize: 3,
      totalPages: 0,
      totalComments: 0
    };

    var onNeedToLogin = function() {
      ModalAlert.alert({
        title: 'PRODUCTS.PLEASE_SIGNIN',
        msg: 'PRODUCTS.PLEASE_SIGNIN_TO_ACCESS'
      });
    };

    // $scope.myInterval = 5000;
    // $scope.slides2 = [];

    // Fetching product:
    $scope.product = ProductsService.get({
        id: $stateParams.productId
      }, function(p) { // success cbk.
        p.images = p.images ? p.images : [];
        p.images.forEach(function(image, index) {
          $scope.slides.push({ url: image.url, index: index+1 });
        });
        // p.rating.value = parseInt(p.rating.value);

      }, function(err) { // error cbk.
        $state.go('main.products.info-404');
      });

    $scope.fetchPage = function() {
      CommentsService.query({
          prodId: $stateParams.productId,
          page: $scope.commentsData.page,
          pageSize: $scope.commentsData.pageSize
        })
        .$promise.then(function(res) {
          $scope.comments = res.results;
          $scope.commentsData.page = res.page;
          $scope.commentsData.totalPages = res.totalPages;
          $scope.commentsData.totalComments = res.total;
          $scope.commentsData.pageSize = res.pageSize;
        });
    };

    $scope.addComment = function(commentTxt) {
      if (!commentTxt || !commentTxt.trim()) { return; }

      if (!$scope.currentUser || !$scope.currentUser.id) {
        onNeedToLogin();
        return;
      }

      var newComment = {
        prodId: $stateParams.productId,
        text: commentTxt
      };
      CommentsService.save(newComment, function(data) {
        $scope.fetchPage();
        $rootScope.$emit(EVENT_NAMES.addComment, newComment);
        $scope.newComment = '';
        $scope.commentSent = true;
      });
    };

    $scope.$watch('commentsData.page', function(newVal, oldVal) {
      $scope.fetchPage();
    });

    $scope.rate = function(val) {
      if ($scope.rateVal || ratingInProcess) { return; }

      if (!$scope.currentUser || !$scope.currentUser.id) {
        onNeedToLogin();
        return;
      }

      ratingInProcess = true;

      ProductsService.rate({_id: $scope.product._id, rating: val}, function() { // success cbk.
        $scope.userHasRated = true;
        $scope.rateVal = val;
        ratingInProcess = false;
      }, function() { // err cbk.
        ratingInProcess = false;
      });
    };

    $scope.addToWishList = function() {
      if (!$scope.currentUser || !$scope.currentUser.id) {
        return onNeedToLogin();
      }

      UserService.addToWishList({ prodId: $scope.product._id }, function() {
        $rootScope.$emit(EVENT_NAMES.addWishList, $scope.product);
      });
    };

    $scope.removeFromWishList = function() {
      UserService.removeFromWishList({ itemId: $scope.product._id }, function() {
        $rootScope.$emit(EVENT_NAMES.removeWishList, $scope.product);
      });
    };

    $scope.hasWishListedProduct = function() {
      if (!$scope.currentUser || !$scope.product) {
        return false;
      }
      if (!$scope.currentUser.wishList) {
        $scope.currentUser.wishList = [];
      }
      return $scope.currentUser.wishList.indexOf($scope.product._id) >= 0;
    };

    // $scope.fetchPage(); // fetching first page.
  }
]);
