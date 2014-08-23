//var Bookshelf = require('bookshelf');
var Mongoose = require('mongoose');
var path = require('path');
var hostIP = process.env.IP || '127.0.0.1';
// MAYBE DB IP

// var db = Bookshelf.initialize({
//   client: 'sqlite3',
//   connection: {
//     host: hostIP,
//     user: 'your_database_user',
//     password: 'password',
//     database: 'shortlydb',
//     charset: 'utf8',
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   }
// });
if(hostIP === '127.0.0.1'){
  Mongoose.connect('mongodb://localhost/');
}else{
  Mongoose.connect('???????hostIP');
}
var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  //INVOKE SCHEMAS AND MODEL DEFINITIONS HERE








})
// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('base_url', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

var urlTable = Mongoose.Schema({
  id: ObjectId, //Possibly Index?
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: Number,
  timestamps: { type: Date, default: Date.now },
});


// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

var userTable = Mongoose.Schema({
  id: ObjectId,
  username: { type: [String], index: true},
  password: String,
  timestamps: { type: Date, default: Date.now }
});

module.exports = db;
