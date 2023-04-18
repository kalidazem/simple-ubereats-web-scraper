// External imports

// Internal imports
const catchAsync = require('../utils/catchAsync');
const services = require('./services');

const getMenu = catchAsync(async (req, res) => {
  const { url } = req.body;
  const menu = await services.getMenu(url);
  res.status(200).json(menu);
});

module.exports = {
  getMenu,
};
