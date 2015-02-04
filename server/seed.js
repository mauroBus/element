
var mongoose = require('mongoose'),
    config = require('./config/env/development'),
    Users = require('./models/user'),
    User = mongoose.model('User'),
    Category = require('./models/category'),
    CategoryTree = mongoose.model('CategoryTree'),
    Roles = require('./config/roles');

mongoose.connect(config.db.uri);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(callback) {

  ////////////////
  // Super User //
  ////////////////
  var superUser = new User({
    firstName: 'MAURO',
    lastName: 'BUSELLI',
    displayName: 'SUPER_USER',
    email: 's@u.com',
    username: 'SUPER_USER',
    password: 'aaaaaa',
    provider: 'local',
    roles: [Roles.admin, Roles.user, Roles.editor],
    // updated: '',
    created: new Date()
    // active: true
  });

  superUser.save(function(err) {
    if (err) {
      console.log('Noooooooo! There were problems.');
      console.log(err);
    } else {
      console.log('Super Dupper User created.');
    }
  });

  ////////////////
  // Categories //
  ////////////////
  var categs = [
    {_id: 'products', name: 'Products', path: ',products,'},
    {_id: 'household',name: 'Household', path: ',products,household,'},
    {_id: 'appliance', name: 'Appliance', path: ',products,household,appliance,'},
    {_id: 'electronics', name: 'Electronics', path: ',products,household,electronics,'},
    {_id: 'office', name: 'Office', path: ',products,office,'},
    {_id: 'computers', name: 'Computers', path: ',products,office,computers,'},
    {_id: 'desk', name: 'Desk', path: ',products,office,desk,'},
    {_id: 'pens', name: 'Pens', path: ',products,office,desk,pens,'},
    {_id: 'stationary', name: 'Stationary', path: ',products,office,desk,stationary,'}
  ];

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
});
