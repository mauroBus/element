
angular.module('elementBoxApp.products.productInfo')

.controller('ProductInfoCtrl', [
          '$scope', '$modal', '$stateParams', 'ProductsService', 'CommentsService',
  function($scope,   $modal,   $stateParams,   ProductsService,   CommentsService) {
    $scope.slides = [];
    $scope.slidesIndex = 0;
    // $scope.newComment = '';

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
    });

    $scope.addComment = function(newComment) {
      newComment = newComment.trim();
      if (newComment) {
        CommentsService.save({
          prodId: $stateParams.productId,
          text: newComment
        }, function() {
          // $scope.newComment = '';
          $scope.fetchPage();
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

    $scope.fetchPage(); // fetching first page.
  }
]);
