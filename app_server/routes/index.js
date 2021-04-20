const express = require('express');
const router = express.Router();
const locationsController = require('../controllers/locations');
const othersController = require('../controllers/others');

/* LOCATIONS */
router.get('/', locationsController.homeList);
router.get('/location', locationsController.locationInfo);
router.get('/location/review/new', locationsController.addReview);

/* OTHERS */
router.get('/about', othersController.about);

module.exports = router;
