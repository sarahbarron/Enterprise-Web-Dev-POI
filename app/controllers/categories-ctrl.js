'use strict';

const CategoryModel = require('../models/categories');
const Poi = require('../models/poi');
const ObjectId = require('mongodb').ObjectID;


const Category = {
    addCategory: {
        handler: async function(request, h) {
            try {
                const data = request.payload;
                const name = data.name.toUpperCase();
                const all_ready_created_category = await CategoryModel.findOne({
                    name : name,
                }).collation({locale: 'en', caseLevel: false});

                if (all_ready_created_category == null)
                {
                    const newCategory = new CategoryModel({
                        name: name
                    });
                    await newCategory.save();
                }
                return h.redirect('/home')

            } catch (err) {
                console.log("Category-ctrl, addCategory: " + err);
            }
        }
    }
};

module.exports = Category;