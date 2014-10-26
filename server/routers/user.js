'use strict';

var passport = require('passport'),
    users = require('../controllers/users.js');

/**
 * Application routes
 */
module.exports = function(app) {

  //displays our signup page
  // app.get('/signin', function(req, res){
  //   res.redirect('/#/login');
  // });

  //sends the request through our local signup strategy, and if successful takes user to homepage, otherwise returns then to signin page
  // app.post('/local-reg', passport.authenticate('local', {
  //   successRedirect: '/',
  //   failureRedirect: '/#/login'
  // }));

  // app.get('/login', passport.authenticate('local', {
  //   successRedirect: '/',
  //   failureRedirect: '/#/login'
  // }));

  //logs user out of site, deleting them from the session, and returns to homepage
  // app.get('/logout', function(req, res){
  //   var name = req.user ? req.user.username : undefined;
  //   console.log("LOGGIN OUT " + name);
  //   req.logout();
  //   res.redirect('/#');
  //   req.session.notice = "You have successfully been logged out " + name + "!";
  // });

  app.param('userId', users.user);

  app.post('/api/login', passport.authenticate('local', {
    // failureRedirect: '/#/login',
    failureFlash: 'Invalid email or password.'
  }), users.login);

  app.post('/api/logout', users.logout);
  app.post('/api/register', users.create);

  app.post('/api/users', users.create);
  app.get('/api/users', users.query);
  app.get('/api/users/:userId', users.show);
  app.del('/api/users/:userId', users.remove);

  // app.post('/api/users/session', passport.authenticate('local', {
  //   // failureRedirect: '/#/login',
  //   // failureFlash: 'Invalid email or password.'
  // }), users.session);

};
