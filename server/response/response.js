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

  getErrorStatus: function(err) {
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
      res.status(err ? Response.getErrorStatus(err) : Response.FOUND);

      res.json(err ?
        Response.getFailureResponse(err) :
        Response.getSuccessResponse(results, total, pagination.page, pagination.pageSize)
      );
    };
  },

  create: function (req, res) {
    return function (err, data) {
      res.status(err ? Response.getErrorStatus(err) : (data ? Response.CREATED : Response.NOT_CREATED));
      res.json(err ? new Response.getFailureResponse(err) : data);
    };
  },

  read: function(req, res) {
    return function(err, data) {
      res.status(err ? Response.getErrorStatus(err) : (data ? Response.FOUND : Response.NOT_FOUND));
      res.json(err ? Response.getFailureResponse(err) : data);
    };
  },

  update: function (req, res) {
    return function (err, data) {
      res.status(err ? Response.getErrorStatus(err) : (data ? Response.UPDATED : Response.NOT_UPDATED));
      res.json(err ? new Response.getFailureResponse(err) : data);
    };
  },

  delete: function (req, res) {
    return function (err) {
      res.status(err ? Response.getErrorStatus(err) : Response.DELETED);
      if (err) {
        res.json(new Response.getFailureResponse(err));
      } else {
        res.end();
      }
    };
  }

};

module.exports = Response;
