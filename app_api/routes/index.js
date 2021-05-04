const express = require("express");
const router = express.Router();
const locationsController = require("../controllers/locations");
const reviewsController = require("../controllers/reviews");
const authenticationController = require("../controllers/authentication");

// LOCATIONS
router
  .route("/locations")
  .get(locationsController.listLocationsByDistance)
  .post(locationsController.createLocation);

router
  .route("/locations/:locationId")
  .get(locationsController.getLocation)
  .put(locationsController.updateLocation)
  .delete(locationsController.deleteLocation);

// REVIEWS
router
  .route("/locations/:locationId/reviews")
  .post(reviewsController.createReview);

router
  .route("/locations/:locationId/reviews/:reviewId")
  .get(reviewsController.getReview)
  .put(reviewsController.updateReview)
  .delete(reviewsController.deleteReview);

router.post("/register", authenticationController.register);
router.post("/login", authenticationController.login);

module.exports = router;
