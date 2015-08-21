'use strict';

var fileUpload = require('../controllers/fileUpload'),
    users = require('../controllers/users'),
    Roles = require('../config/roles'),
    hasDefaultAuthorization = users.hasAuthorization([Roles.default]);

/**
 * Application routes
 */
module.exports = function(app) {
  app.post('/upload', users.requiresLogin, hasDefaultAuthorization, fileUpload.upload);
};
