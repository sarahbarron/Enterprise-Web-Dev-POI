const PointOfInterest = require('../models/poi');
const User = require('../models/user')

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
                return h.view('allpois',
                    {
                        title: 'All created POIs',
                        poi: poi_list
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
                return h.redirect('/allpois')
            }catch(err){
                return h.view('main', {errors: [{message: err.message}]})
            }
        }},
    deletepoi:{
        handler: async function(request, h) {
            try {

                const id = request.params.id;
                await PointOfInterest.findByIdAndDelete(id);
                return h.redirect('/allpois')
            }
             catch (err) {
                return h.view('main', {errors: [{message: err.message}]})
            }
        }
    }
};

module.exports = Poi;