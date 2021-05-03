const request = require('request');

const apiOptions = {
    server: 'http://localhost:3000'
};

if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://murmuring-brook-43687.herokuapp.com'
};

const showError = (req, res, status) => {
    let title = '';
    let content = '';
    if (status === 404) {
        title = '404 - Page Not Found';
        content = 'Oh dear! Looks like we can\'t this page. Sorry!'
    } else {
        title = `${status} - Something's Gone Wrong`
        content = 'Something, somewhere, sometime, has gone a little bit wrong!';
    }
    res.status(status);
    res.render('generic-text', {
        title,
        content
    });
}

const formatDistance = (distance) => {
    let currentDistance = 0;
    let unit = 'm';
    if (distance > 1000) {
        currentDistance = parseFloat(distance / 1000).toFixed(1);
        unit = 'km';
    } else {
        currentDistance = Math.floor(distance);
    }
    return currentDistance + unit;
}

const renderHomepage = (req, res, responseBody) => {
    let message = null;
    if (!(responseBody instanceof Array)) {
        message = "API lookup error";
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = "No places found nearby";
        }
    }
    res.render('locations-list', {
        title: 'Loc8r - find a place to work with Wi-Fi',
        sidebar: 'Looking for Wi-Fi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you\'re looking for.',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places to work with Wi-Fi near you!'
        },
        locations: responseBody,
        message
    });
}

const homeList = (req, res) => {
    const path = '/api/locations'
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
        qs: {
            lng: -0.7992599,
            lat: 51.378091,
            maxDistance: 20
        }
    };
    request(
        requestOptions,
        (err, { statusCode }, body) => {
            let data = [];
            if (statusCode === 200 && body.length) {
                data = body.map((item) => {
                    item.distance = formatDistance(item.distance);
                    return item;
                });
                renderHomepage(req, res, data);
            } else {
                showError(req, res, statusCode);
            }
        }
    );
};

const renderDetailPage = function (req, res, location) {
    res.render('location-info', {
        title: location.name,
        pageHeader: { title: location.name },
        sidebar: {
            context: 'is on Loc8r because it has accessible Wi-Fi and space to sit down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location
    });
}

const getLocationInfo = (req, res, callback) => {
    const path = `/api/locations/${req.params.locationId}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    };
    request(
        requestOptions,
        (err, { statusCode }, body) => {
            const data = body;
            if (statusCode === 200) {
                data.coords = {
                    lng: body.coords[0],
                    lat: body.coords[1]
                }
                callback(req, res, data);
            } else {
                showError(req, res, statusCode);
            }

        }
    );
}

const locationInfo = (req, res) => {
    getLocationInfo(req, res, 
        (req, res, responseData) => renderDetailPage(req, res, responseData));
};

const renderReviewForm = (req, res, {name}) => {
    res.render('location-review-form', {
        title: `Review ${name} on Loc8r`,
        pageHeader: { title: `Review ${name}` },
        error: req.query.err
    });
}

const addReview = (req, res) => {
    getLocationInfo(req, res, 
        (req, res, responseData) => renderReviewForm(req, res, responseData));
};

const doAddReview = (req, res) => {
    const locationId = req.params.locationId;
    const path = `/api/locations/${locationId}/reviews`;
    const postData = {
        author: req.body.name,
        rating: parseInt(req.body.rating, 10),
        reviewText: req.body.review
    };
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'POST',
        json: postData
    };
    request(
        requestOptions,
        (err, {statusCode}, {name}) => {
            if(statusCode === 201) {
                res.redirect(`/location/${locationId}`);
            } else if(statusCode === 400 && name && name === 'ValidationError') {
                res.redirect(`/location/${locationId}/review/new?err=val`);
            } else {
                showError(req, res, statusCode);
            }
        }
    )
};

module.exports = {
    homeList,
    locationInfo,
    addReview,
    doAddReview
};