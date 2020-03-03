'use strict';
const cloudinary = require('cloudinary');
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

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
        await cloudinary.uploader.upload('./public/temp.img');
    },

    deleteImage: async function(id) {
        await cloudinary.v2.uploader.destroy(id, {});
    },

};

module.exports = ImageStore;