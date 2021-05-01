const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const listLocationsByDistance = async (req, res) => {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);

    const near = {
        type: "Point",
        coordinates: [lng, lat]
    };

    const geoOptions = {
        distanceField: "distance.calculated",
        key: 'coords',
        spherical: true,
        maxDistance: 20000
    }

    if ((!lng && lng !== 0) || (!lat && lat !== 0)) {
        return res
            .status(404)
            .json({
                "message": "lng and lat query parameters are required"
            });
    }

    try {
        const results = await Loc.aggregate([
            {
                $geoNear: {
                    near,
                    ...geoOptions
                }
            }, {
                $limit: 10
            }
        ]);
        const locations = results.map(result => {
            return {
                _id: result._id,
                name: result.name,
                address: result.address,
                rating: result.rating,
                facilities: result.facilities,
                distance: `${result.distance.calculated.toFixed()}`
            }
        });
        return res
            .status(200)
            .json(locations)
    } catch (err) {
        console.log(err);
    }
};

const createLocation = (req, res) => {
    Loc.create({
        name: req.body.name,
        address: req.body.address,
        facilities: req.body.facilities.split(","),
        coords: {
            type: "Point",
            coordinates: [
                parseFloat(req.body.lng),
                parseFloat(req.body.lat)
            ]
        }, openingTimes: [{
            days: req.body.days1,
            opening: req.body.opening1,
            closing: req.body.closing1,
            closed: req.body.closed1,
        }, {
            days: req.body.days2,
            opening: req.body.opening2,
            closing: req.body.closing2,
            closed: req.body.closed2,
        }]
    }, (err, location) => {
        if (err) {
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(location);
        }
    })
};

const getLocation = (req, res) => {
    Loc
        .findById(req.params.locationId)
        .exec((err, location) => {
            if (!location) {
                return res
                    .status(404)
                    .json({ "message": "location not found" });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(location);
            }
        });
};

const updateLocation = (req, res) => {
    if (!req.params.locationId) {
        return res
            .status(404)
            .json({
                "message": "LocationId is required"
            });
    }
    Loc
        .findById(req.params.locationId)
        .select('-reviews -rating')
        .exec((err, location) => {
            if (!location) {
                return res
                    .status(404)
                    .json({
                        "message": "Location not found"
                    });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            location.name = req.body.name,
                location.address = req.body.address,
                location.facilities = req.body.facilities.split(",");
            location.coords = {
                type: "Point",
                coordinates: [
                    parseFloat(req.body.lng),
                    parseFloat(req.body.lat)
                ]
            };
            location.openingTimes = [{
                days: req.body.days1,
                opening: req.body.opening1,
                closing: req.body.closing1,
                closed: req.body.closed1,
            }, {
                days: req.body.days2,
                opening: req.body.opening2,
                closing: req.body.closing2,
                closed: req.body.closed2,
            }];
            location.save((err, location) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                } else {
                    res
                        .status(200)
                        .json(location);
                }
            })
        });

};

const deleteLocation = (req, res) => {
    const { locationId } = req.params;
    if (locationId) {
        Loc
            .findByIdAndRemove(locationId)
            .exec((err, location) => {
                if (err) {
                    return res
                        .status(404)
                        .json(err);
                }
                res
                    .status(204)
                    .json(null);
            })
    } else {
        return res
            .status(404)
            .json({
                "message": "No location"
            });
    }

};

module.exports = {
    listLocationsByDistance,
    createLocation,
    getLocation,
    updateLocation,
    deleteLocation
}