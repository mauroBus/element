
/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * Auth callback
 */
// exports.authCallback = function(req, res, next) {
//   res.redirect('/');
// };

/**
 * Login User
 */
exports.login = function(req, res) {
  // var user = User.find(req.body.);

  // req.logIn(user, function(err) {
  //   if (err) return next(err);
  //   // return res.redirect('/');
  // });

  console.log('user logged in');
  res.json({
    msg: 'logged in'
  });
};

/**
 * Show sign up form
 */
// exports.signup = function(req, res) {
//   res.render('users/signup', {
//     title: 'Sign up',
//     user: new User()
//   });
// };

/**
 * Logout
 */
exports.logout = function(req, res) {
  req.logOut();
  // req.session.destroy(function(err) {
  //   // cannot access session here
  // });
  res.json({
    msg: 'logged out'
  });
};

/**
 * Session
//  */
exports.session = function(req, res) {
  // res.redirect('/');
};

/**
 * Create user (Register)
 */
exports.create = function(req, res, next) {
  var user = new User(req.body);
  user.provider = 'local';
  user.save(function(err) {
    if (err) {
      return next(new Error('Failed to create User ' + err));
    }
    req.logIn(user, function(err) {
      if (err) return next(err);
      // return res.redirect('/');
    });
  });
};

/**
 * Show a user
 */
exports.show = function(req, res) {
  res.json(req.profile);
};

/**
 * Remove an user
 */
exports.remove = function(req, res) {
  var user = req.profile;

  user.remove(function(err) {
    if (err) return res.json(500, err);
    res.json(user);
  });
};


/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
  User
    .findOne({ _id : id })
    .exec(function(err, user) {
      if (err) return next(err);
      if (!user) return next(new Error('Failed to load User ' + id));
      req.profile = user;
      next();
    });
};

/**
 * List of users
 */
exports.query = function(req, res) {
  User.find().sort('-name').exec(function(err, elements) {
    if (err) return res.json(500, err);
    res.json(elements);
  });
};
