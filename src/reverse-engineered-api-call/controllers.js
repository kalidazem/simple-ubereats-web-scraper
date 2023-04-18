// Internal imports

const catchAsync = require('../utils/catchAsync');
const { apiCall } = require('./services');

const getMenu = catchAsync(async (req, res) => {
  const { storeUuid } = req.body;
  res.writeHead(200, { 'Content-Type': 'application/json' });
  await apiCall.getMenu(
    (data) => {
      res.write(JSON.stringify(data));
    },
    () => res.end(),
    storeUuid
  );
});

module.exports.controllers = {
  getMenu,
};
