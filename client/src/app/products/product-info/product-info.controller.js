
angular.module('elementBoxApp.products.productInfo')

.controller('ProductInfoCtrl', [
          '$scope', '$rootScope', '$modal', '$stateParams', 'ProductsService', 'UserService', 'CommentsService', 'EVENT_NAMES',
  function($scope,   $rootScope,   $modal,   $stateParams,   ProductsService,   UserService,   CommentsService,   EVENT_NAMES) {
    $scope.slides = [];
    $scope.slidesIndex = 0;
    $scope.userHasRated = false;
    $scope.rateVal = null;
    var ratingInProcess = false;

    $scope.contactFromDate = null;
    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };
    $scope.checkinDPOpened = false;

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

    // Fetching products:
    $scope.product = ProductsService.get({id: $stateParams.productId}, function(p) {
      p.images.forEach(function(image, index) {
        $scope.slides.push({ url: image.url, index: index+1 });
      });
      // p.rating.value = parseInt(p.rating.value);
    });

    $scope.addComment = function(commentTxt) {
      commentTxt = commentTxt.trim();
      if (commentTxt) {
        var newComment = {
          prodId: $stateParams.productId,
          text: commentTxt
        };
        CommentsService.save(newComment, function(data) {
          $scope.fetchPage();
          $rootScope.$emit(EVENT_NAMES.addComment, newComment);
        });
      }
    };

    $scope.$watch('commentsData.page', function(newVal, oldVal) {
      $scope.fetchPage();
    });

    var sendContact = function(text) {
      console.log(text);
    };

    $scope.doContact = function() {
      $modal.open({
        templateUrl: 'products/product-info/fragments/contact.modal.html',
        controller: function($scope) {
          $scope.contactText = '';
          $scope.send = sendContact;
        },
        // size: 'sm',
        // backdrop: 'static'
      });
    };

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

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.checkinDPOpened = true;
    };

    $scope.addToWishList = function() {
      UserService.addToWishList({ prodId: $scope.product._id }, function() {
        $rootScope.$emit(EVENT_NAMES.addWishList, $scope.product);
      });
    };

    $scope.fetchPage(); // fetching first page.
  }
]);
