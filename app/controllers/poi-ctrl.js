const PointOfInterest = require('../models/poi');
const User = require('../models/user');
const Image = require('../models/image')
const Utils = require('../utils/isAdmin');
const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');
const ImageStore = require('../utils/image-store');
const Category = require('../models/categories')

const Poi = {
    home: {
        handler: async function(request, h) {
            try {
                const filter = request.payload;
                const id = request.auth.credentials.id;
                const user = await User.findById(id).lean();
                let poi_list;
                if (filter != null ){
                    const filter_by_category = await Category.findOne({name: filter.category});
                    poi_list = await PointOfInterest.find({user: user, category: filter_by_category}).populate('user').populate('category').lean().sort('-category');
                }
                else {
                    poi_list = await PointOfInterest.find({user: user}).populate('user').populate('category').lean().sort('-category');
                }
                const scope = user.scope;
                const isadmin = Utils.isAdmin(scope);
                const category = await Category.find().lean().sort('name');
                return h.view('home',
                    {
                        title: 'Points Of Interest',
                        poi: poi_list,
                        firstName: user.firstName.toUpperCase(),
                        lastName: user.lastName.toUpperCase(),
                        isadmin: isadmin,
                        onlyusercanview: true,
                        categories: category
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
                const rawCategory = request.payload.category;
                const category = await Category.findOne({
                    name : rawCategory
                });

                // Create the new POI
                const newPoi = new PointOfInterest({
                    name: data.name,
                    description: data.description,
                    category: category._id,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    user: user._id
                });
                await newPoi.save();

                // //Upload image to cloudinary & save details to DB
                const image_file = data.image;
                await ImageStore.uploadImage(image_file, newPoi._id);

                // Increment num of pois for the user
                let numOfPoi = parseInt(user.numOfPoi);
                user.numOfPoi = numOfPoi + 1;
                await user.save();

                // redirect to view all POI's
                return h.redirect('/home')
            }catch(err){
                return h.view('home', {errors: [{message: err.message}]})
            }
        },
        payload:{
            multipart: true,
            output: 'data',
            maxBytes: 209715200,
            parse: true
        }
        },
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
                const poi = await PointOfInterest.findById(poi_id).populate('image').populate('category').lean().sort('-category');
                const user_id = request.auth.credentials.id;
                const user = await User.findById(user_id).lean();
                const scope = user.scope;
                const isadmin = Utils.isAdmin(scope);
                const category = await Category.find().lean();

                return h.view('update-poi', { title: 'Update POI', poi: poi, isadmin: isadmin, categories: category});
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
                const rawCategory = userEdit.category;
                const category = await Category.findOne({
                    name : rawCategory
                }).lean();

                poi.name = userEdit.name;
                poi.category = category._id;
                poi.description = userEdit.description;
                poi.longitude = userEdit.longitude;
                poi.latitude = userEdit.latitude;
                await poi.save();
                return h.redirect('/home');

            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });

            }
        },
    },

    showSinglePoi: {
        handler: async function(request, h) {
            try {
                const poi_id = request.params.id;
                const poi = await PointOfInterest.findById(poi_id).populate('image').populate('category').lean();
                const user_id = request.auth.credentials.id;
                const user = await User.findById(user_id).lean();
                const scope = user.scope;
                const isadmin = Utils.isAdmin(scope);

                return h.view('view-poi', { title: 'View Single POI', poi: poi, isadmin: isadmin });
            } catch (err) {
                return h.view('login', { errors: [{ message: err.message }] });
            }
        }
    },
};

module.exports = Poi;