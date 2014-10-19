'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../../client/dist');

module.exports = {
  root: rootPath,
  ipaddr: process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
  port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000,
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  }
};
