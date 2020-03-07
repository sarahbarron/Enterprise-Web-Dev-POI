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
                const file = request.payload.image;
                const poi_id = request.params.poi;

                if (Object.keys(file).length > 0) {
                    await ImageStore.uploadImage(file, poi_id);
                }
                return h.redirect('/home');
            } catch (err) {
                console.log("Image Ctrl, UploadFile: "+ err);

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
                await ImageStore.deleteImage(image_id);
                return h.redirect('/home');

            } catch (err) {
                console.log("DELETE ERROR" + err);
            }
        }
    }

};

module.exports = Gallery;