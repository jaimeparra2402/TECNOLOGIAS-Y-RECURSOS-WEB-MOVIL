const mongoose = require('mongoose'); 
const Loc = mongoose.model('Location');

const locationsReadAll = async function (req, res) {
    try {    
        const locations = await Loc.find().exec();
        
        res.status(200).json(locations);
    } catch (err) {
        res.status(500).json({ error: err.message }); 
    }
}

const locationsReadOne = async function (req, res) {
    try {
        const location = await Loc.findById(req.params.locationId).exec();
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        
        return res.status(200).json(location);
    } catch (err) {
        console.error(err);
        if(err.name === 'CastError' && err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid location ID' });
        }
        res.status(500).json({ error: err.message });
    }
}

const locationsCreate = function (req, res) {
    try {
        const location = new Loc.create(
            req.body
        );
        res.status(200).json(location);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}   

module.exports = {
    locationsReadAll,
    locationsReadOne,
    locationsCreate
};