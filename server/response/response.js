'use strict';

var errorHandler = require('./errors');

var Response = {
  SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  FAILURE: 400,
  CREATED: 201,
  DELETED: 204,
  FOUND: 200,
  UPDATED: 200,
  NOT_CREATED: 400,
  NOT_FOUND: 404,
  NOT_UPDATED: 404,
  NOT_AUTHENTICATED: 401,
  NOT_AUTHORIZED: 403,

  status: function(err) {
    return err instanceof BadRequest ? Response.BAD_REQUEST : Response.SERVER_ERROR;
  },

  getFailureResponse: function(err) {
    var errObj = errorHandler._getErrorObject(err);
    errObj.status = Response.FAILURE;
    return errObj;
  },

  pagination: function(req) {
    var parsedPageSize = parseInt(req.param('pageSize'));
    return {
      page: parseInt(req.param('page')) || 1,
      pageSize: (!isNaN(parsedPageSize) && parsedPageSize < 100) ? parsedPageSize : 10
    };
  },

  getSuccessResponse: function(results, total, page, pageSize) {
    var res = {};
    if (page) {
      res.total = total;
      res.totalPages = Math.ceil(total / pageSize);
      res.page = page;
      res.pageSize = pageSize;
    }
    res.status = Response.FOUND;
    res.results = results;
    return res;
  },

  query: function(req, res) {
    var pagination = Response.pagination(req);

    return function(err, results, total) {
      if (err) { console.error(err); }
      res.status(err ? Response.status(err) : Response.FOUND);

      res.json(err ?
        Response.getFailureResponse(err) :
        Response.getSuccessResponse(results, total, pagination.page, pagination.pageSize)
      );
    };
  },

  read: function(req, res, accepts) {
    return function(err, data) {
      res.status(err ? Response.status(err) : (data ? Response.FOUND : Response.NOT_FOUND));
      var contentType = req.accepts(accepts);
      switch (contentType) {
        case 'application/json':
          res.type(contentType);
          res.end(JSON.stringify(err ? Response.getFailureResponse(err) : data));
          break;
        // case 'text/html':
        // case 'application/xhtml+xml':
        //   res.type(contentType);
        //   //TODO an HTML or XHTML view
        //   //res.render('error',{error:err});
        //   res.end(require('nice-xml').stringify({
        //     response: err ? new Response.getFailureResponse(err) : data
        //   }));
        //   break;
        // case 'application/x-yaml':
        // case 'text/yaml':
        //   res.type(contentType);
        //   res.end(require('js-yaml').dump(err ? new Response.getFailureResponse(err) : data));
        //   break;
        // case 'application/x-www-form-urlencoded':
        //   res.type(contentType);
        //   res.end(require('querystring').stringify(err ? new Response.getFailureResponse(err) : data));
        //   break;
        default:
          res.type('text/plain');
          res.end(JSON.stringify(err ? Response.getFailureResponse(err) : data));
      }
    };
  },

  update: function (req, res, accepts) {
    return function (err, data) {
      res.status(err ? Response.status(err) : (data ? Response.UPDATED : Response.NOT_UPDATED));
      var contentType = req.accepts(accepts);
      switch (contentType) {
      case 'application/json':
        res.type(contentType);
        res.end(JSON.stringify(err ? new Response.getFailureResponse(err) : data));
        break;
      case 'text/html':
      case 'application/xhtml+xml':
        res.type(contentType);
        //TODO an HTML or XHTML view
        //res.render('error',{error:err});
        res.end(require('nice-xml').stringify({
          response: err ? new Response.getFailureResponse(err) : data
        }));
        break;
      case 'application/x-yaml':
      case 'text/yaml':
        res.type(contentType);
        res.end(require('js-yaml').dump(err ? new Response.getFailureResponse(err) : data));
        break;
      case 'application/x-www-form-urlencoded':
        res.type(contentType);
        res.end(require('querystring').stringify(err ? new Response.getFailureResponse(err) : data));
        break;
      default:
        res.type('text/plain');
        res.end(JSON.stringify(err ? new Response.getFailureResponse(err) : data));
      }
    };
  },
  delete: function (req, res, accepts) {
    return function (err) {
      res.status(err ? Response.status(err) : Response.DELETED);
      if (err) {
        var contentType = req.accepts(accepts);
        switch (contentType) {
        case 'application/json':
          res.type(contentType);
          res.end(JSON.stringify(new Response.getFailureResponse(err)));
          break;
        case 'text/html':
        case 'application/xhtml+xml':
          res.type(contentType);
          //TODO an HTML or XHTML view
          //res.render('error',{error:err});
          res.end(require('nice-xml').stringify({
            response: new Response.getFailureResponse(err)
          }));
          break;
        case 'application/x-yaml':
        case 'text/yaml':
          res.type(contentType);
          res.end(require('js-yaml').dump(new Response.getFailureResponse(err)));
          break;
        case 'application/x-www-form-urlencoded':
          res.type(contentType);
          res.end(require('querystring').stringify(new Response.getFailureResponse(err)));
          break;
        default:
          res.type('text/plain');
          res.end(JSON.stringify(new Response.getFailureResponse(err)));
        }
      } else {
        res.end();
      }
    };
  },
  create: function (req, res, accepts) {
    return function (err, data) {
      res.status(err ? Response.status(err) : (data ? Response.CREATED : Response.NOT_CREATED));
      var contentType = req.accepts(accepts);
      switch (contentType) {
      case 'application/json':
        res.type(contentType);
        res.end(JSON.stringify(err ? new Response.getFailureResponse(err) : data));
        break;
      case 'text/html':
      case 'application/xhtml+xml':
        res.type(contentType);
        //TODO an HTML or XHTML view
        //res.render('error',{error:err});
        res.end(require('nice-xml').stringify({
          response: err ? new Response.getFailureResponse(err) : data
        }));
        break;
      case 'application/x-yaml':
      case 'text/yaml':
        res.type(contentType);
        res.end(require('js-yaml').dump(err ? new Response.getFailureResponse(err) : data));
        break;
      case 'application/x-www-form-urlencoded':
        res.type(contentType);
        res.end(require('querystring').stringify(err ? new Response.getFailureResponse(err) : data));
        break;
      default:
        res.type('text/plain');
        res.end(JSON.stringify(err ? new Response.getFailureResponse(err) : data));
      }
    };
  }
};

module.exports = Response;
