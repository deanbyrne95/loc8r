const request = require('request');

const apiOptions = {
    server: 'http://localhost:3000'
};

if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://murmuring-brook-43687.herokuapp.com'
};

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
    if(!(responseBody instanceof Array)) {
        message = "API lookup error";
        responseBody = [];
    } else {
        if(!responseBody.length) {
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

/* GET 'locations' page */
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
            }
            renderHomepage(req, res, data);
        }
    );
};

const renderDetailPage = function(req, res, location) {
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

const locationInfo = (req, res) => {
    const path = `/api/locations/${req.params.locationId}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    };
    request(
        requestOptions,
        (err, response, body) => {
            const data = body;
            data.coords = {
                lng: body.coords[0],
                lat: body.coords[1]
            }
            renderDetailPage(req, res, data);
        }
    );
};

const addReview = (req, res) => {
    res.render('location-review-form', {
        title: 'Review Starcups on Loc8r',
        pageHeader: { title: 'Review Starcups' }
    });
};

module.exports = {
    homeList,
    locationInfo,
    addReview
};