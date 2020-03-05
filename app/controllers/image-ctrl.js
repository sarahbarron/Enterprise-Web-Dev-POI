'use strict';

const ImageStore = require('../utils/image-store');
const Poi = require('../models/poi');
const Image = require('../models/image');
const ObjectId = require('mongodb').ObjectID;

const Gallery = {
    index: {
        handler: async function(request, h) {
            try {
                const allImages = await ImageStore.getAllImages();
                return h.view('gallery', {
                    title: 'Cloudinary Gallery',
                    images: allImages
                });
            } catch (err) {
                console.log(err);
            }
        }
    },

    uploadFile: {
        handler: async function(request, h) {
            try {
                const file = request.payload.imagefile;
                if (Object.keys(file).length > 0) {
                    await ImageStore.uploadImage(request.payload.imagefile);
                    return h.redirect('/');
                }
                return h.view('gallery', {
                    title: 'Cloudinary Gallery',
                    error: 'No file selected'
                });
            } catch (err) {
                console.log(err);
            }
        },
        payload: {
            multipart: true,
            output: 'data',
            maxBytes: 209715200,
            parse: true
        }
    },

    deleteImage: {
        handler: async function(request, h) {
            try {

                const image_id = request.params.img_id;
                // const image_obj = await Image.findById(image_id).populate('poi').lean();
                // const image_public_id = image_obj.public_id;
                //
                // const poi_id = image_obj.poi._id.toString();
                // let poi_obj = await Poi.findById(poi_id).lean();
                //
                // // Pull the objectId reference from the POI schema
                // await Poi.findByIdAndUpdate(
                //     {"_id": poi_id}, // poi to delete from
                //     {
                //         $pull: {image:{$in:[image_obj]}} // look for the Image ObjectId and remove it
                //     },
                //     { safe: true },
                //     function(err) {
                //         if(err){
                //             console.log(err);
                //         }
                // });
                //
                //
                // // Delete image document from MongoDB
                // await Image.findByIdAndDelete(image_id);
                //
                // // Delete image from cloudinary
                await ImageStore.deleteImage(image_id);

                return h.redirect('/home');
            } catch (err) {
                console.log("DELETE ERROR" + err);
            }
        }
    }

};

module.exports = Gallery;