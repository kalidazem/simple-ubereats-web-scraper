// External imports
const axios = require('axios');
const JSONStream = require('JSONStream');
const es = require('event-stream');
const httpStatus = require('http-status');

// Internal imports
const ApiError = require('../utils/ApiError');

const API_ENDPOINT = 'https://www.ubereats.com/api/getStoreV1?localeCode=gb';
/**
 * Gets menu of a particular store by calling Ubereats API.
 * I went through Ubereats network calls to see how they would get their menus data.
 * @param {Function} cb callback function to call when data from stream is ready
 * @param {Function} endCb callback function to call when stream is ended.
 * @param {String} storeUuid the store uuid
 */
const getMenu = async (cb, endCb, storeUuid = '') => {
  if (!storeUuid) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'missing storeUuid');
  }

  if (typeof cb !== 'function') {
    throw new Error('You either missed to pass your callback or the passed object is not a function');
  }

  axios.defaults.headers.common['x-csrf-token'] = 'x';
  const response = await axios.post(
    API_ENDPOINT,
    { storeUuid },
    {
      // When omitting PostmanRuntime user agent, response results in 409 error for some reason.
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'PostmanRuntime/7.29.2' },
      responseType: 'stream',
    }
  );

  const parser = JSONStream.parse('*');

  /**
   * Logic to distinguish between below statuses is implemented below
   * Success response body: {status: "success", data:{some data}}
   * Fail response body: {status: "failure", data:{some data}}
   */
  let failure = false;
  parser.on('data', (data) => {
    // data can be either string stating status (success/failure)
    // and object containing data with respect to status
    if (typeof data === 'string') {
      if (data === 'failure') failure = true; // so on next chunk we send call back the error message
    }

    // failure status (will get here )
    if (typeof data === 'object' && failure === true) {
      cb(data); // data of failure
    }

    // success status
    if (typeof data === 'object' && failure === false) {
      cb(data.catalogSectionsMap); // data when everything is ok. catalogSectionsMap contains menu
    }
  });

  parser.on('end', () => endCb());

  response.data.pipe(parser);
};

module.exports.apiCall = {
  getMenu,
};
