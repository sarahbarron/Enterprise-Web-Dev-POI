const PointOfInterest = require('../models/poi');
const User = require('../models/user');
const Utils = require('./utils');

const Poi = {
    home: {
        handler: function(request, h) {
            return h.view('home', { title: 'Points of Interest' });
        }
    },

    allpois: {
        handler: async function(request, h) {
            try {
                const id = request.auth.credentials.id;
                const user = await User.findById(id).lean();
                const poi_list = await PointOfInterest.find({user: user}).populate('user').lean();
                const scope = user.scope;
                const isadmin = Utils.isAdmin(scope);
                const notadmin = Utils.notAdmin(scope);
                return h.view('allpois',
                    {
                        title: 'All created POIs',
                        poi: poi_list,
                        isadmin: isadmin,
                        notadmin: notadmin
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
                return h.redirect('/allpois')
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

                return h.redirect('/allpois')
            }
            catch (err) {
                return h.view('main', {errors: [{message: err.message}]})
            }
        }
    }
};

module.exports = Poi;