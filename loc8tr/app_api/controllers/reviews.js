const mongoose = require('mongoose'); 
const Loc = mongoose.model('Location');

const reviewsReadOne = async function (req, res) {
    try {    
        const locations = await Loc.find().exec();
        
        res.status(200).json(locations);
    } catch (err) {
        res.status(500).json({ error: err.message }); 
    }
}

const reviewsCreate = async function (req, res) {
    try {
        const location = await Loc.findById(req.params.locationId).select('name reviews').exec();
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        
        location.reviews.push({
          author: req.body.author,
          rating: req.body.rating,
          reviewText: req.body.reviewText
        });
        
        const savedLocation =  location.save();
        const review = savedLocation.reviews[savedLocation.reviews.length - 1];
        
        return res.status(200).json(review);  

    } catch (err) {
        console.error(err);
        if(err.name === 'CastError' && err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid location ID' });
        }
        res.status(500).json({ error: err.message });
    }
}

const locationsCreate = function (req, res) {
    res.status(200).json({ message: 'Create a new location' });
}   

module.exports = {
    reviewsReadOne,
    reviewsCreate
};