// Schema for a Point of interest
'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const PoiSchema = new Schema({

    name: String,
    description: String,
    longitude: Number,
    latitude: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    category:{
        type: Schema.Types.ObjectID,
        ref: 'Category',
    },
    image:[{
        type: Schema.Types.ObjectID,
        ref: 'Image'
    }]});

module.exports = Mongoose.model('Poi', PoiSchema);