/*
Author: Sarah Barron
College: Waterford Institute of Technology
Course: Hdip Computer Science
Module: Enterprise Web Development
Assigment 1: POI's
Model for a user
includes their first name, last name, email and password
 */

'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const Boom = require('@hapi/boom');

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
<<<<<<< HEAD
=======
    numOfPoi: Number,
>>>>>>> release/0.2.0
    scope: Array
});

userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email : email});
};


userSchema.methods.comparePassword = function(candidatePassword) {
    const isMatch = this.password === candidatePassword;
    if (!isMatch) {
        throw Boom.unauthorized('Password mismatch');
    }
    return this;
};

module.exports = Mongoose.model('User', userSchema);