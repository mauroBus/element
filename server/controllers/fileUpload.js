// Options: formidable | Busboy | 
'use strict';

var formidable = require('formidable'),
    fs = require('fs'),
    path = require('path'),
    errorHandler = require('../response/errors'),
    config = require('../config/config'),
    imgs = ['png', 'jpg', 'jpeg', 'gif', 'bmp'];


exports.upload = function(req, res) {
  var form = new formidable.IncomingForm();
  form.uploadDir = config.uploadDirTmp;
  form.maxFieldsSize = 2 * 1024 * 1024; // 2MB max

  form.parse(req, function(err, fields, files) {
    var oldPath = files.file.path,
        fileSize = files.file.size,
        fileExt = files.file.name.split('.').pop(),
        index = oldPath.lastIndexOf('/') + 1,
        fileName = oldPath.substr(index),
        newFilePath = fileName + '.' + fileExt,
        newPath = path.join(process.env.PWD, config.uploadDir, fileName + '.' + fileExt);

    if (imgs.indexOf(fileExt) === -1) {
      // res.status(400).send(errorHandler.getErrorObject({msg: 'file type not supported.'}));
      res.status(400).json({status: 400, error: 'file type not supported.'});
      return;
    }

    // Saving the file:
    fs.readFile(oldPath, function(err, data) {
      fs.writeFile(newPath, data, function(err) {
        fs.unlink(oldPath, function(err) {
          if (err) {
            res.status(500).json({status: 500, error: 'Failed to save file.'});
          } else {
            res.status(200).json({ path: 'uploads/' + newFilePath });
          }
        });
      });
    });

  });

  form.on('error', function(err) {
    res.json(400, errorHandler.getErrorObject(err));
  });

};

// var img = require('easyimage');
//
// img.info(req.files.file.path, function (err, stdout, stderr) {
//   if (err) throw err;
// //      console.log(stdout); // could determine if resize needed here
//   img.rescrop({
//       src: req.files.file.path, dst: fnAppend(req.files.file.path, 'thumb'),
//       width: 50, height: 50
//     },
//     function (err, image) {
//       if (err) throw err;
//       res.send({image: true, file: req.files.file.originalname, savedAs: req.files.file.name, thumb: fnAppend(req.files.file.name, 'thumb')});
//     }
//   );
// });

