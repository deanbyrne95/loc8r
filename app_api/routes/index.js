const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['RS256'],
});
const locationsController = require('../controllers/locations');
const reviewsController = require('../controllers/reviews');
const authenticationController = require('../controllers/authentication');

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
    .post(auth, reviewsController.createReview);

router
    .route('/locations/:locationId/reviews/:reviewId')
    .get(reviewsController.getReview)
    .put(auth, reviewsController.updateReview)
    .delete(auth, reviewsController.deleteReview);

router.post('/register', authenticationController.register);
router.post('/login', authenticationController.login);

module.exports = router;
