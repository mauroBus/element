
var mongoose = require('mongoose'),
    config = require('./config/env/development'),
    Users = require('./models/user'),
    User = mongoose.model('User'),
    Category = require('./models/category'),
    CategoryTree = mongoose.model('CategoryTree'),
    Product = require('./models/product'),
    ProductsModel = mongoose.model('Product'),
    Roles = require('./config/roles'),
    fs = require('fs');

mongoose.connect(config.db.uri);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(callback) {

  ////////////////
  // Users      //
  ////////////////
  fs.readFile('./seed-data/users.json', function(err, data) {
    if (err) {
      console.error(err);
      process.exit(0);
    }
    var users = JSON.parse(data);

    User.remove().exec(function(error) {
      users.forEach(function(user) {
        var userSchema = new User(user);

        userSchema.save(function(err) {
          if (err) {
            console.log('Oooooops! There were problems.');
            console.log(err);
          } else {
            console.log('User: '+ user.email +' created.');
          }
        });
      });
    }); // Users.remove
  }); // fs.readFile

  ////////////////
  // Categories //
  ////////////////
  fs.readFile('./seed-data/categories.json', function(err, data) {
    if (err) {
      console.error(err);
      process.exit(0);
    }
    var categs = JSON.parse(data);

    CategoryTree.remove().exec(function(error) {
      categs.forEach(function(categ) {
        var newCateg = new CategoryTree(categ);

        newCateg.save(function(err) {
          if (err) {
            console.log('Category "' + categ._id + '" not created.');
            console.log(err);
          } else {
            console.log('Category "' + categ._id + '" created!');
          }
        });
      });
      // process.exit(0);
    }); // Category.remove
  }); // fs.readFile


  ////////////////
  // Products   //
  ////////////////
  fs.readFile('./seed-data/products.json', function(err, data) {
    if (err) {
      console.error(err);
      process.exit(0);
    }
    var products = JSON.parse(data);

    ProductsModel.remove().exec(function(error) {
      products.forEach(function(prod) {
        var newProd = new ProductsModel(prod);

        newProd.save(function(err) {
          if (err) {
            console.log('Product "' + prod.title + '" not created.');
            console.log(err);
          } else {
            console.log('Product "' + prod.title + '" created!');
          }
        });
      });
      // process.exit(0);
    }); // Category.remove
  }); // fs.readFile

});

console.log('Awaiting...');
