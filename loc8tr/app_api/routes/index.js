const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlReviews = require('../controllers/reviews');

//Locations
router.get('/locations', ctrlLocations.locationsReadAll);
router.get('/locations/:locationId', ctrlLocations.locationsReadOne);
router.post('/locations', ctrlLocations.locationsCreate);
//router.put('/locations/:locationId', ctrlLocations.locationsUpdateOne);
//router.delete('/locations/:locationId', ctrlLocations.locationsDeleteOne);


//router.post('/locations/:locationId/reviews', ctrlReviews.reviewsCreate);
router.get('/locations/:locationId/reviews/:reviewId', ctrlReviews.reviewsReadOne);
//router.put('/locations/:locationId/reviews/:reviewId', ctrlReviews.reviewsUpdateOne);
//router.delete('/locations/:locationId/reviews/:reviewId', ctrlReviews.reviewsDeleteOne);   
module.exports = router;