'use strict';

/**
 * Get unique error field name
 */
var getUniqueErrorMessage = function(err) {
  var output;

  try {
    var fieldName = err.err.substring(err.err.lastIndexOf('.$') + 2, err.err.lastIndexOf('_1'));
    output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';

  } catch (ex) {
    output = 'Unique field already exists';
  }

  return output;
};

/**
 * Get the error message from error object
 */
var _getErrorMessage = function(err) {
  var message = '';

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(err);
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) {
        message += err.errors[errName].message;
      }
    }
  }

  return message;
};

/**
 * Get a custom error object from other error object
 */
var _getErrorObject = function(err) {
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        return {
          message: getUniqueErrorMessage(err)
        };
      default:
        return {
          message: 'Something went wrong'
        };
    }
  } else {
    return {
      message: _getErrorMessage(err),
      errors: err.errors
    };
  }
};

module.exports.getErrorMessage = _getErrorMessage;
module.exports.getErrorObject = _getErrorObject;
