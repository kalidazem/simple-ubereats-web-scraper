// External imports
const router = require('express').Router();

// Internal imports
const { controllers } = require('./controllers');

router.post('/get-menu', controllers.getMenu);

module.exports = router;
