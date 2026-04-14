const mongoose = require('mongoose'); 
const Loc = mongoose.model('Location');

const reviewsReadOne = async function (req, res) {
    try {
        const location = await Loc.findById(req.params.locationId).select('name reviews').exec();
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        
        const review = location.reviews.id(req.params.reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        
        return res.status(200).json(review);

    } catch (err) {
        console.error(err);
        if(err.name === 'CastError' && err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid location ID' });
        }
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

const reviewsUpdateOne = function (req, res) {
    try {
        const location = Loc.findById(req.params.locationId).select('name reviews').exec();
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        
        const review = location.reviews.id(req.params.reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        
        review.author = req.body.author;
        review.rating = req.body.rating;
        review.reviewText = req.body.reviewText;
        
        const savedLocation =  location.save();
        
        return res.status(200).json(review);

    } catch (err) {
        console.error(err);
        if(err.name === 'CastError' && err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid location ID' });
        }
        res.status(500).json({ error: err.message });
    }
}

const reviewsDeleteOne = function (req, res) {
    try {
        const location = Loc.findById(req.params.locationId).select('name reviews').exec();
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        
        const review = location.reviews.id(req.params.reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        
        review.remove();
        const savedLocation =  location.save();
        
        return res.status(200).json({ message: 'Review deleted successfully' });

    } catch (err) {
        console.error(err);
        if(err.name === 'CastError' && err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid location ID' });
        }
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    reviewsReadOne,
    reviewsCreate,
    reviewsUpdateOne,
    reviewsDeleteOne
};