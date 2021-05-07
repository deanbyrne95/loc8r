const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256'],
});
const locationsController = require('../controllers/locations');
const reviewsController = require('../controllers/reviews');
const authenticationController = require('../controllers/authentication');
const usersController = require('../controllers/users');

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

// AUTHENTICATION
router.post('/register', authenticationController.register);
router.post('/login', authenticationController.login);
router.post('/profiles/:userId/edit', authenticationController.refreshUser);

// USERS
router.route('/profiles')
    .get(usersController.getUserList)

router
    .route('/profiles/:userId')
    .get(usersController.getUser)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser);

module.exports = router;
