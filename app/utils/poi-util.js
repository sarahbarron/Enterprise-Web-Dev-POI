'use strict';

const Poi = require('../models/poi');
const ImageStore = require('../utils/image-store');
const User = require('../models/user');
const PoiUtil = {
    deletePoi: async function(poi_id) {
        try {
            const poi = await Poi.findById(poi_id).populate('image').populate('user').lean();
            const user_id = poi.user._id;
            const images = poi.image;
            // Decrement num of pois
            const user = await User.findById(user_id);
            let numOfPoi = parseInt(user.numOfPoi);
            user.numOfPoi = numOfPoi - 1;
            await user.save();

            if (images.length > 0)
            {
                let i;
                for (i = 0; i < images.length; i++)
                {
                    let image_id = images[i]._id;
                    await ImageStore.deleteImage(image_id);
                }
            }
            await Poi.findByIdAndDelete(poi_id);
        }catch (e) {
            console.log("PoiUtils - deletePoi Error: "+ e);
        }
    },

};

module.exports = PoiUtil;
