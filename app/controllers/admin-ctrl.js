'use strict';
const User = require('../models/user');
const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');
const Utils = require('../utils/isAdmin');
const PointOfInterest = require('../models/poi');
const PoiUtils = require('../utils/poi-util');
const Category = require('../models/categories')

const Admin = {
    adminDashboard: {
        auth: {scope: 'admin'},
        handler: async function(request, h) {
            try {
                const id = request.auth.credentials.id;
                const user = await User.findById(id).lean();
                const allusers = await User.find({scope: 'user'}).lean().sort('lastName');
                const scope = user.scope;
                const isadmin = Utils.isAdmin(scope);
                return h.view('admin-dashboard',
                    {
                        title: 'All Users',
                        users: allusers,
                        isadmin: isadmin,
                    });
            }catch (err) {
                return h.view('login', {errors:[{message: err.message}]})
            }
        }
    },
    deleteUser: {
        auth: {scope: ['admin']},
        handler: async function (request, h) {
            try {
                const id = request.params.id;
                const user = await User.findById(id).lean();
                const pois = await PointOfInterest.find({user: user});
                if(pois.length > 0)
                {
                    let i;
                    for (i = 0; pois.length > i; i++)
                    {
                        let poi_id = pois[i]._id;
                        await PoiUtils.deletePoi(poi_id);
                    }
                }
                await User.findByIdAndDelete(id);
                return h.redirect('/admin-dashboard')
            } catch (err) {
                return h.view('admin-dashboard', {errors: [{message: err.message}]})
            }
        }
    },

    viewUser:{
        auth: {scope: 'admin'},
        handler: async function(request, h){
            try{
                try{

                    const id = request.params.id;
                    const user = await User.findById(id);
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
                            const filter_by_category = await Category.findOne({name: filter.category}).lean();
                            poi_list = await PointOfInterest.find({user:user, category: filter_by_category}).populate('user').populate('category').lean().sort('-category');
                            defaultcategory = filter_by_category;
                        }
                    }
                    if (filter == null) {
                        const filter_by_category = await Category.find().lean().sort('name');
                        poi_list = await PointOfInterest.find({user:user, category: filter_by_category}).populate('user').populate('category').lean().sort('-category');
                        if (filter_by_category.length > 0)
                        {
                            defaultcategory = filter_by_category[0];
                        }
                    }

                    const categories = await Category.find().lean().sort('name');
                    return h.view('user-pois', {
                        title: "View User",
                        userid: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        categories: categories,
                        poi: poi_list,
                        defaultcategory: defaultcategory,
                        onlyusercanview: false,
                        isadmin: true
                    });
                }catch (err) {
                    console.log("Category-ctrl, viewCategories: " + err);
                }





                // const id = request.params.id;
                // const user = await User.findById(id);
                // const poi_list = await PointOfInterest.find({user: user}).populate('user').populate('category').lean().sort('-category');
                // const categories = await Category.find().lean();
                // return h.view('user-pois',
                //     {
                //         title: 'View User',
                //         firstName: user.firstName,
                //         lastName: user.lastName,
                //         poi: poi_list,
                //         isadmin: true,
                //         onlyusercanview: false,
                //         categories: categories
                //     });

            }catch (err) {
                return h.view('admin-dashboard', {errors: [{message: err.message}]})
            }
        }
    }
};
module.exports = Admin;