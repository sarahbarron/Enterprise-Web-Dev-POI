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

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

module.exports = Mongoose.model('User', userSchema);