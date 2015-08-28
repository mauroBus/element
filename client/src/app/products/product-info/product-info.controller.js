
angular.module('elementBoxApp.products.productInfo')

.controller('ProductInfoCtrl', [
          '$scope', '$rootScope', '$stateParams', '$timeout', 'ProductsService', 'UserService', 'CommentsService', 'EVENT_NAMES',
  function($scope,   $rootScope,   $stateParams,   $timeout,   ProductsService,   UserService,   CommentsService,   EVENT_NAMES) {
    $scope.slides = [];
    $scope.slidesIndex = 0;
    $scope.userHasRated = false;
    $scope.rateVal = null;
    $scope.newComment = '';
    $scope.commentSent = false;
    var ratingInProcess = false;

    $rootScope.$emit('title', 'Product Info');

    // Comments pagination:
    $scope.comments = [];
    $scope.commentsData = {
      page: 1,
      pageSize: 3,
      totalPages: 0,
      totalComments: 0
    };

    // $scope.myInterval = 5000;
    // $scope.slides2 = [];

    // Fetching product:
    $scope.product = ProductsService.get({id: $stateParams.productId}, function(p) {
      p.images = p.images ? p.images : [];
      p.images.forEach(function(image, index) {
        $scope.slides.push({ url: image.url, index: index+1 });
      });
      // p.rating.value = parseInt(p.rating.value);
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
