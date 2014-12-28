
var mongoose = require('mongoose'),
    config = require('./config/env/development'),
    Users = require('./models/user'),
    User = mongoose.model('User'),
    Roles = require('./config/roles');

mongoose.connect(config.db.uri);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(callback) {
  // yay!

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

});
