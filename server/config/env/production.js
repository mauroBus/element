'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../public');

module.exports = {
  root: rootPath,
  env: 'production',
  db: { // mongodb options
    uri: process.env.OPENSHIFT_MONGODB_DB_URL
    // options: {
    //   user: process.env.OPENSHIFT_MONGODB_DB_USERNAME
    //   pass: process.env.OPENSHIFT_MONGODB_DB_PASSWORD
    // }
  }
};
