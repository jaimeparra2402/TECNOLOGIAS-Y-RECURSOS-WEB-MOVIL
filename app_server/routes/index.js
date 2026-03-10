var express = require('express');
var router = express.Router();

const ctrlLocations = require('../controllers/locations');
const ctrlOther = require('../controllers/other');

/* Locations pages. */

router.get('/', ctrlLocations.homeList);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

/* Others pages. */

router.get('/about', ctrlOther.about);

module.exports = router;
