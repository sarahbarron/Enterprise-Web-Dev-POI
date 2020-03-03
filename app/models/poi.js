// Schema for a Point of interest
'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const PoiSchema = new Schema({
    name: String,
    description: String,
    image: String,
    categories: String,
    longitude: Number,
    latitude: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = Mongoose.model('Poi', PoiSchema);