// Options: Rackspace - Amazon S3 - Cloudinary - Google Cloud Datastore

var cloudinary = require('cloudinary'),
    _ = require('lodash'),
    async = require('async'),
    path = require('path'),
    config = require('../../config/config');


var setCloudAccount = function(accNbr) {
  var accountNbr = accNbr || Math.floor(Math.random() * config.cloudinaryAccounts.length);
  cloudinary.config(config.cloudinaryAccounts[accountNbr]);
  return accountNbr;
};

exports.uploadImgs = function(files, cb) {
  var filesUploaded = [],
      parallelUploads = [],
      cloudAcc = setCloudAccount();

  _.each(files, function(imgPath) {
    parallelUploads.push(function(callback) {
      var imgFullPath = path.join(process.env.PWD, config.uploadDir, '../', imgPath);
      cloudinary.uploader.upload(imgFullPath,
        function(result) { callback(result.error, result); }, {
          crop: 'limit', width: 600, height: 400
      }); // cloudinary.
    });
  }); // each.

  async.parallel(parallelUploads, function(err, results) {
    cb(err, {
      cloudAccNbr: cloudAcc,
      images: err ? [] : _.each(results, function(uploadedImg) { // getting {url, piblic_id} pairs.
        _.pick(uploadedImg, ['url', 'public_id']);
      })
    });
  });
};

exports.removeImgs = function(cloudImgs, cloudAcc, cb) {
  setCloudAccount(cloudAcc);
  cloudinary.api.delete_resources(cloudImgs, function(result) {
    cb(result.error, result);
  });
};


// fetch_format: 'auto',
// eager: [
//   {
//     width: 200, height: 200, crop: 'thumb',
//     gravity: 'face', effect: 'sepia'
//   },
//   {
//     width: 100, height: 150, crop: 'fit', format: 'png'
//   }
// ],
// tags: ['special', 'for_homepage']
