const mongoose = require('mongoose');

const openingHoursSchema = new mongoose.Schema({
  days: { type: String, required: true },
  opening: String,
  closing: String,
  closed: { type: Boolean, required: true }
});

const reviewSchema = new mongoose.Schema({
  author: String,
  rating: { type: Number, min: 0, max: 5, required: true },
  reviewText: String,
  createdOn: { type: Date, default: Date.now }
});

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  rating: { type: Number, min: 0, max: 5},
  facilities: [String],
  coords: { 
    type: {type: String, default: 'Point'},
    coordinates: { type: [Number], index: '2dsphere' }
  },
  distancia: String,
  openingTimes: [openingHoursSchema],
  reviews: [reviewSchema]
});

mongoose.model('Location', locationSchema);