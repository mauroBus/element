
module.exports = {
  clientErrorHandler: function(err, req, res, next) {
    if (req.xhr) {
      res.status(500).send({
        error: 'Something blew up!'
      });
    } else {
      next(err);
    }
  },

  errorHandler: function(err, req, res, next) {
    res.status(500);
    res.json({
      msg: 'error',
      error: err
    });
  }
};
