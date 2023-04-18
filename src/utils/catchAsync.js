/**
 * Author of this code is Hagop Jamkojian
 * code can be found on:
 * https://github.com/hagopj13/node-express-boilerplate/blob/master/src/utils/catchAsync.js
 *
 */

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

module.exports = catchAsync;
