'use strict';

const CategoryModel = require('../models/categories');
const Poi = require('../models/poi');
const PoiUtils = require('../utils/poi-util')


const Category = {
    viewCategories: {
        auth: {scope: ['admin']},
        handler: async function(request,h){
            try{
                let filter = request.payload;
                let poi_list;
                let defaultcategory;

                if(filter !=null)
                {
                    if (filter.category === "all")
                    {
                        filter = null;
                    } else
                    {
                        const filter_by_category = await CategoryModel.findOne({name: filter.category}).lean();
                        poi_list = await Poi.find({category: filter_by_category}).populate('user').populate('category').lean().sort('-category');
                        defaultcategory = filter_by_category;
                    }
                }
                if (filter == null) {
                    const filter_by_category = await CategoryModel.find().lean().sort('name');
                    poi_list = await Poi.find({category: filter_by_category}).populate('user').populate('category').lean().sort('-category');
                    if (filter_by_category.length > 0)
                    {
                        defaultcategory = filter_by_category[0];
                    }
                }

                const categories = await CategoryModel.find().lean().sort('name');
                return h.view('categories', {
                    categories: categories,
                    poi: poi_list,
                    defaultcategory: defaultcategory,
                    onlyusercanview: false,
                    isadmin: true
                });
            }catch (err) {
                console.log("Category-ctrl, viewCategories: " + err);
        }
    }},
    addCategory: {
        auth: {scope: ['admin']},
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
                return h.redirect('/categories');

            } catch (err) {
                console.log("Category-ctrl, addCategory: " + err);
            }
        }
    },

    deleteCategory: {
        auth: {scope: ['admin']},
        handler: async function (request, h)
        {
            try
            {
                const data = request.payload;
                let categories;
                if (data.category === 'all')
                {
                    categories = await CategoryModel.find().lean();
                }
                else
                {
                    categories = await CategoryModel.find({name: data.category}).lean();
                }
                let num;
                for (num=0; num<categories.length; num++)
                {
                    const category_id = categories[num]._id;
                    const pois = await Poi.find({category: category_id});
                    if (pois.length > 0)
                    {
                        let i;
                        for (i = 0; i < pois.length; i++)
                        {
                            let poi_id = pois[i];
                            PoiUtils.deletePoi(poi_id);
                        }
                    }
                }
                if (data.category === 'all')
                {
                    await CategoryModel.deleteMany();
                }
                else{
                    await CategoryModel.findOneAndDelete({name: data.category});
                }
                return h.redirect('/categories');

            } catch (err)
            {
                console.log("Category-ctrl, deleteCategory: " + err);
            }
        }
    }
};

module.exports = Category;