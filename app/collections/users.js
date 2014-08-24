// NOTE: this file is not needed when using MongoDB
var db = require('../config');
var User = require('../models/user');
var Mongoose = require('mongoose');

//var Users = new db.Collection();
var Users = Mongoose.model('User', userTable)
Users.model = User;

module.exports = Users;
