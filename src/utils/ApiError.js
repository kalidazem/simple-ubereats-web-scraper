/**
 * Author of this code is Hagop Jamkojian
 * code can be found on:
 * https://raw.githubusercontent.com/hagopj13/node-express-boilerplate/master/src/middlewares/error.js
 *
 * Note: code has been amended to fit my case
 */

class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
