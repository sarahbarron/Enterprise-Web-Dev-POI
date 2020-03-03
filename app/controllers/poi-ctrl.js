const PointOfInterest = require('../models/poi');
const User = require('../models/user');
const Utils = require('./utils');
const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');

const Poi = {
    home: {
        handler: async function(request, h) {
            try {
                const id = request.auth.credentials.id;
                const user = await User.findById(id).lean();
                const poi_list = await PointOfInterest.find({user: user}).populate('user').lean();
                const scope = user.scope;
                const isadmin = Utils.isAdmin(scope);

                return h.view('home',
                    {
                        title: 'Points Of Interest',
                        poi: poi_list,
                        isadmin: isadmin,
                        onlyusercanview: true
                    });
            }catch (err) {
                return h.view('login', {errors:[{message: err.message}]})
            }
        }
    },

    addpoi:{
        handler: async function(request, h) {
            try {

                const id = request.auth.credentials.id;
                const user = await User.findById(id);
                const data = request.payload;
                // Create the new POI
                const newPoi = new PointOfInterest({
                    name: data.name,
                    description: data.description,
                    image: data.image,
                    category: data.category,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    user: user._id
                });
                await newPoi.save();

                // Increment num of pois for the user
                let numOfPoi = parseInt(user.numOfPoi);
                user.numOfPoi = numOfPoi + 1;
                await user.save();

                // redirect to view all POI's
                return h.redirect('/home')
            }catch(err){
                return h.view('main', {errors: [{message: err.message}]})
            }
        }},
    deletepoi:{
        handler: async function(request, h) {
            try {

                const poi_id = request.params.id;
                await PointOfInterest.findByIdAndDelete(poi_id);

                // Decrement num of pois
                const user_id = request.auth.credentials.id;
                const user = await User.findById(user_id);
                let numOfPoi = parseInt(user.numOfPoi);
                user.numOfPoi = numOfPoi - 1;
                await user.save();

                return h.redirect('/home')
            }
            catch (err) {
                return h.view('main', {errors: [{message: err.message}]})
            }
        }
    },
    // show user settings
    showUpdatePoi: {
        handler: async function(request, h) {
            try {
                const poi_id = request.params.id;
                const poi = await PointOfInterest.findById(poi_id).lean();
                const user_id = request.auth.credentials.id;
                const user = await User.findById(user_id).lean();
                const scope = user.scope;
                const isadmin = Utils.isAdmin(scope);

                return h.view('update-poi', { title: 'Update POI', poi: poi, isadmin: isadmin });
            } catch (err) {
                return h.view('login', { errors: [{ message: err.message }] });
            }
        }
    },

    // Allows user update their settings
    updatePoi: {
        validate: {
            payload: {
                name: Joi.string().required(),
                category: Joi.string().required(),
                description: Joi.string().allow('').allow(null),
                image: Joi.string().allow('').allow(null),
                latitude: Joi.number().required(),
                longitude: Joi.number().required(),
            },
            options: {
                abortEarly: false
            },
            failAction: function(request, h, error) {
                return h
                    .view('home', {
                        title: 'Failed to update POI '+error.details,
                        errors: error.details
                    })
                    .takeover()
                    .code(400);
            }
        },
        handler: async function(request, h) {
            try {
                const userEdit = request.payload;
                const poi_id = request.params.id;
                const poi = await PointOfInterest.findById(poi_id);
                poi.name = userEdit.name;
                poi.category = userEdit.category;
                poi.description = userEdit.description;
                if (userEdit.image != '' && userEdit.image != null) {

                    poi.image = userEdit.image;
                }
                poi.longitude = userEdit.longitude;
                poi.latitude = userEdit.latitude;
                await poi.save();
                return h.redirect('/home');

            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });

            }
        }
    },
};

module.exports = Poi;