
angular.module('elementBoxApp.products')

.service('ProdErrorsService', ['Urls', '$resource', function(Urls, $resource) {

  var checkProdErrors = function(errors, prod, isCategSelected) {
    errors.category = !isCategSelected;
    errors.title = !prod.title || !(prod.title.length >= 5 && prod.title.length <= 55);
    errors.price = prod.price === '' || prod.price < 0;
    errors.description = !prod.description;
    errors.images = !prod.images;
  };

  return {
    checkProdErrors: checkProdErrors
  };

}]);
