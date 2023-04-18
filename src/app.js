// External imports
const express = require('express');

const router = express.Router();
const httpStatus = require('http-status');

const app = express();
app.use(express.json());

// Internal imports

const ApiError = require('./utils/ApiError');
const { errorConverter, errorHandler } = require('./middleware/errorConvertor');
const { ubereats } = require('./ubereats');
const { apiCall } = require('./reverse-engineered-api-call');

router.use(ubereats.routes.baseUrl, ubereats.routes.router);
router.use(apiCall.routes.baseUrl, apiCall.routes.router);

router.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Route does not exist'));
});

app.use(router);

app.use(errorConverter);

app.use(errorHandler);

module.exports = app;
