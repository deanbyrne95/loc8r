const mongoose = require('mongoose');
const Rev = mongoose.model('Location');
const User = mongoose.model('User');

const getAuthor = (req, res, callback) => {
    if (req.payload && req.payload.email) {
        User.findOne({ email: req.payload.email }).exec((err, user) => {
            if (!user) {
                return res.status(404).json({ 'message': 'User not found' });
            } else if (err) {
                console.error(err);
                return res.status(404).json(err);
            }
            callback(req, res, user.name);
        });
    } else {
        return res.status(404).json({ 'message': 'User not found' });
    }
};

const calculateAverageRating = (location) => {
    if (location.reviews && location.reviews.length > 0) {
        const count = location.reviews.length;
        const total = location.reviews.reduce((acc, { rating }) => {
            return acc + rating;
        }, 0);
        location.rating = parseInt(total / count, 10);
    } else {
        location.rating = 0;
    }
    location.save((err) => {
        if (err) {
            console.error(err);
        }
    });
};

const updateAverageRating = (locationId) => {
    Rev.findById(locationId)
        .select('rating reviews')
        .exec((err, location) => {
            if (!err) {
                calculateAverageRating(location);
            } else {
                console.error(err);
            }
        });
};

const addReview = (req, res, location, author) => {
    if (!location) {
        res.status(404).json({ 'message': 'Location not found' });
    } else {
        const { rating, reviewText } = req.body;
        location.reviews.push({
            author,
            rating,
            reviewText,
        });
        location.save((err, location) => {
            if (err) {
                res.status(400).json(err);
            } else {
                updateAverageRating(location._id);
                const review = location.reviews.slice(-1).pop();
                res.status(201).json(review);
            }
        });
    }
};

const createReview = (req, res) => {
    getAuthor(req, res, (req, res, userName) => {
        const locationId = req.params.locationId;
        if (locationId) {
            Rev.findById(locationId)
                .select('reviews')
                .exec((err, location) => {
                    if (err) {
                        res.status(400).json(err);
                    } else {
                        addReview(req, res, location, userName);
                    }
                });
        } else {
            res.status(404).json({ 'message': 'Location not found' });
        }
    });
};

const getReview = (req, res) => {
    Rev.findById(req.params.locationId)
        .select('name reviews')
        .exec((err, location) => {
            if (!location) {
                return res
                    .status(404)
                    .json({ 'message': 'Location not found' });
            } else if (err) {
                return res.status(404).json(err);
            }
            if (location.reviews && location.reviews.length > 0) {
                const review = location.reviews.id(req.params.reviewId);
                if (!review) {
                    return res
                        .status(404)
                        .json({ 'message': 'Review not found' });
                } else {
                    response = {
                        location: {
                            name: location.name,
                            id: req.params.locationId,
                        },
                        review,
                    };
                    return res.status(200).json(response);
                }
            } else {
                return res.status(404).json({ 'message': 'No reviews found' });
            }
        });
};

const updateReview = (req, res) => {
    if (!req.params.locationId && !req.params.reviewId) {
        return res.status(404).json({
            'message': 'locationId and reviewId are required',
        });
    }
    Rev.findById(req.params.locationId)
        .select('reviews')
        .exec((err, location) => {
            if (!location) {
                return res.status(404).json({
                    'message': 'Location not found',
                });
            } else if (err) {
                return res.status(400).json(err);
            }
            if (location.reviews && location.reviews.length > 0) {
                const review = location.reviews.id(req.params.reviewId);
                if (!review) {
                    res.status(400).json({
                        'message': 'Review not found',
                    });
                } else {
                    review.author = req.body.author;
                    review.rating = req.body.rating;
                    review.reviewText = req.body.reviewText;
                    review.createdOn = Date.now();
                    location.save((err, location) => {
                        if (err) {
                            res.status(404).json(err);
                        } else {
                            updateAverageRating(location._id);
                            res.status(200).json(review);
                        }
                    });
                }
            } else {
                res.status(404).json({
                    'message': 'No review to update',
                });
            }
        });
};

const removeReview = (req, res, author) => {
    const { locationId, reviewId } = req.params;
    if (!locationId && !reviewId) {
        return res.status(404).json({
            'message': 'Not found - locationId and reviewId are both required',
        });
    }
    Rev.findById(locationId)
        .select('reviews')
        .exec((err, location) => {
            if (!location) {
                return res.status(404).json({
                    'message': 'Location not found',
                });
            } else if (err) {
                return res.status(400).json(err);
            }

            if (location.reviews && location.reviews.length > 0) {
                if (!location.reviews.id(reviewId)) {
                    return res.status(404).json({
                        'message': 'Review not found',
                    });
                } else {
                    location.reviews.id(reviewId).remove();
                    location.save((err) => {
                        if (err) {
                            return res.status(404).json(err);
                        } else {
                            updateAverageRating(location._id);
                            res.status(204).json(null);
                        }
                    });
                }
            } else {
                res.status(404).json({
                    'message': 'No review to delete',
                });
            }
        });
};

const deleteReview = (req, res) => {
    getAuthor(req, res, (req, res, userName) => {
        const locationId = req.params.locationId;
        if (locationId) {
            Rev.findById(locationId)
                .select('reviews')
                .exec((err, location) => {
                    if (err) {
                        res.status(400).json(err);
                    } else {
                        removeReview(req, res, location, userName);
                    }
                });
        } else {
            res.status(404).json({ 'message': 'Location not found' });
        }
    });
};

module.exports = {
    createReview,
    getReview,
    updateReview,
    deleteReview,
};
