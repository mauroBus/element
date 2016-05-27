
var mongoose = require('mongoose'),
    config = require('./config/env/development'),
    Product = require('./models/product'),
    ProductsModel = mongoose.model('Product'),
    _ = require('lodash');

mongoose.connect(config.db.uri, config.db.options);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(callback) {

  // ProductsModel.find()
  //   .exec(function(err, products) {
  //     products.forEach(function(prod) {
  //       prod.owner = prod.user.ref;

  //       prod.save(function(err) {
  //         if (err) {
  //           console.log('Product "' + prod.title + '" NOT updated.');
  //           console.log(err);
  //         } else {
  //           console.log('Product "' + prod.title + '" updated!');
  //         }
  //       });
  //     });

  //     // process.exit(0);
  // });



  ProductsModel.find()
    .exec(function(err, products) {
      products.forEach(function(prod) {

        _.each(prod.comments, function(com) {
          if (com.user) {
            com.user = com.owner;
            com.owner = undefined;
          }
        });

        prod.save(function(err) {
          if (err) {
            console.log('Product "' + prod.title + '" COMMENTS NOT updated.');
            console.log(err);
          } else {
            console.log('Product "' + prod.title + '" COMMENTS updated!');
          }
        });
      });
      // process.exit(0);
  });


});

console.log('Awaiting...');
