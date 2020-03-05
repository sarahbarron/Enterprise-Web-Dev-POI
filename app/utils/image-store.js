'use strict';
const cloudinary = require('cloudinary');
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

const Poi = require('../models/poi');
const Image = require('../models/image');

const ImageStore = {
    configure: function() {
        const credentials = {
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET
        };
        cloudinary.config(credentials);
    },

    getAllImages: async function() {
        const result = await cloudinary.v2.api.resources();
        return result.resources;
    },

    uploadImage: async function(imagefile) {
        await writeFile('./public/temp.img', imagefile);
        return await cloudinary.uploader.upload('./public/temp.img');
    },

    deleteImage: async function(image_id) {
        try {
            const image_obj = await Image.findById(image_id).populate('poi').lean();
            const image_public_id = image_obj.public_id;
            const poi_id = image_obj.poi._id.toString();

            // Pull the objectId reference from the POI schema
            await Poi.findByIdAndUpdate(
                {"_id": poi_id}, // poi to delete from
                {
                    $pull: {image:{$in:[image_obj]}} // look for the Image ObjectId and remove it
                },
                { safe: true },
                function(err) {
                    if(err){
                        console.log(err);
                    }
                });

            // Delete image document from MongoDB
            await Image.findByIdAndDelete(image_id);

            await cloudinary.v2.uploader.destroy(image_public_id, {});
        }catch (e) {
            console.log("Delete Image Error: "+ e);
        }
    },

};

module.exports = ImageStore;