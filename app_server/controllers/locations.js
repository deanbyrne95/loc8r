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
    if(distance > 1000) {
        currentDistance = parseFloat(distance / 1000).toFixed(1);
        unit = 'km';
    } else {
        currentDistance = Math.floor(distance);
    }
    return currentDistance + unit;
}

const renderHomepage = (req, res, responseBody) => {
    res.render('locations-list', {
        title: 'Loc8r - find a place to work with Wi-Fi',
        sidebar: 'Looking for Wi-Fi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you\'re looking for.',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places to work with Wi-Fi near you!'
        },
        locations: responseBody
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
        (err, response, body) => {
            let data = [];
            data = body.map( (item) => {
                item.distance = formatDistance(item.distance);
                return item;
            });
            renderHomepage(req, res, data);
        }
    )
};

const locationInfo = (req, res) => {
    res.render('location-info', {
        title: 'Location Information',
        pageHeader: { title: 'Starcups' },
        sidebar: {
            context: 'is on Loc8r because it has accessible Wi-Fi and space to sit down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location: {
            name: 'Starcups',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 3,
            facilities: ['Hot Drinks', 'Food', 'Premium Wi-Fi'],
            coords: { lat: 51.455041, lng: -0.9690884 },
            openingTimes: [{
                days: 'Monday - Friday',
                opening: '7:00am',
                closing: '7:00pm',
                closed: false
            }, {
                days: 'Saturday',
                opening: '8:00am',
                closing: '5:00pm',
                closed: false
            }, {
                days: 'Sunday',
                closed: true
            }],
            reviews: [{
                author: 'Simon Holmes',
                rating: 5,
                timestamp: '16 July 2013',
                reviewText: 'What a great place. I can\'t say enough good things about it.'
            }, {
                author: 'Charlie Chaplin',
                rating: 3,
                timestamp: '16 June 2013',
                reviewText: 'It was okay. Coffee wasn\'t great, but the Wi-Fi was fast.'
            }]
        }
    });
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