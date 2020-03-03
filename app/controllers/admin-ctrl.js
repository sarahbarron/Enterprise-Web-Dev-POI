'use strict';
const User = require('../models/user');
const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');
const Utils = require('../utils/isAdmin');
const PointOfInterest = require('../models/poi')
const Admin = {
    adminDashboard: {
        auth: {scope: 'admin'},
        handler: async function(request, h) {
            try {
                const id = request.auth.credentials.id;
                const user = await User.findById(id).lean();
                const allusers = await User.find().lean();
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
                const id = request.params.id;
                const user = await User.findById(id);
                const poi_list = await PointOfInterest.find({user: user}).populate('user').lean();

                return h.view('user-pois',
                    {
                        title: 'View User',
                        firstName: user.firstName.toUpperCase(),
                        lastName: user.lastName.toUpperCase(),
                        poi: poi_list,
                        isadmin: true,
                        onlyusercanview: false,
                    });

            }catch (err) {
                return h.view('admin-dashboard', {errors: [{message: err.message}]})

            }
        }
    }
};
module.exports = Admin;