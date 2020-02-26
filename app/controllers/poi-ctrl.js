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
            const poi_list = await PointOfInterest.find().lean()
            return h.view('allpois',
                {
                    title: 'All created POIs',
                    poi: poi_list
                });
        }
    },

    addpoi:{
        handler: async function(request, h) {
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
                user: user
            });
            await newPoi.save();
            return h.redirect('/allpois')
        }},
};

module.exports = Poi;