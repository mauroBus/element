'use strict';

var path = require('path'),
    privateKeys = require('./private.keys');

var rootPath = path.normalize(__dirname + '/../../public');

module.exports = {
  root: rootPath,
  env: 'production',
  db: { // mongodb options
    uri: process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/elementbox-dev',
    options: {
      user: process.env.OPENSHIFT_MONGODB_DB_USERNAME || '',
      pass: process.env.OPENSHIFT_MONGODB_DB_PASSWORD || ''
    }
  },
  mailer: {
    from: privateKeys.mailer.from,
    options: {
      service: privateKeys.mailer.service,
      auth: {
        user: privateKeys.mailer.user,
        pass: privateKeys.mailer.pass
      }
    }
  },
  cloudinaryAccounts: privateKeys.cloudinaryAccounts
};
