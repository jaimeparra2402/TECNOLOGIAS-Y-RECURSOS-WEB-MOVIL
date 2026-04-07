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

const locationsReadOne = async function (req, res) {
    try {
        const location = await Loc.findById(req.params.locationId).select('name reviews').exec();
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        
        const review = await location.reviews.id(req.params.reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        
        const response = {
            location: {
                name: location.name,
                _id: req.params.locationId
            },
            review,
        };
        
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
    reviewsReadOne
};