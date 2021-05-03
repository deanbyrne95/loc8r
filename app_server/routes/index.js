const express = require('express');
const router = express.Router();
const locationsController = require('../controllers/locations');
const othersController = require('../controllers/others');

/* LOCATIONS */
router.get('/', locationsController.homeList);
router.get('/location/:locationId', locationsController.locationInfo);
router
    .route('/location/:locationId/review/new')
    .get(locationsController.addReview)
    .post(locationsController.doAddReview);

/* OTHERS */
router.get('/about', othersController.about);

module.exports = router;
