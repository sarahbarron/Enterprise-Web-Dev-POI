'use strict';
const User = require('../models/user');
const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');
const Utils = require('./utils');

const Admin = {
    adminDashboard: {
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
};
module.exports = Admin;