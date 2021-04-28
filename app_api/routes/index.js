const express = require('express');
const router = express.Router();
const locationsController = require('../controllers/locations');
const reviewsController = require('../controllers/reviews');

// LOCATIONS
router
    .route('/locations')
    .get(locationsController.listLocationsByDistance)
    .post(locationsController.createLocation);

router
    .route('/locations/:locationId')
    .get(locationsController.getLocation)
    .put(locationsController.updateLocation)
    .delete(locationsController.deleteLocation);

// REVIEWS
router
    .route('/locations/:locationId/reviews')
    .post(reviewsController.createReview);

router
    .route('/locations/:locationId/reviews/:reviewId')
    .get(reviewsController.getReview)
    .put(reviewsController.updateReview)
    .delete(reviewsController.deleteReview);

module.exports = router;