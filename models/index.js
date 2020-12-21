'use strict';

var fs        = require('fs');
var path      = require('path');
// var Sequelize = require('sequelize'); Changes because of import [OLD VERSION]
let { Sequelize, DataTypes } = require('sequelize'); //[NEW VERSION]
var basename  = path.basename(module.filename); // return current FileName (index.js)
var env       = process.env.NODE_ENV || 'development';  // select NODE_ENV or "development" environment 
var config    = require(__dirname + '/../config/config.js')[env]; // return DataBase information from env property of config.json
var db        = {};

// Create an instance of Squelize class
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)    // used to read synchronously read the contents of a given directory (return index.js, user.js)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'); // return js file except for index.js
  })
  .forEach(function(file) {
    // var model = sequelize['import'](path.join(__dirname, file));   //[OLDVERSION]  make each model file being sequelize model by using import function of sequelize
    let model = require(path.join(__dirname, file))(sequelize, DataTypes)   // Asign model definitions
    db[model.name] = model;                                                 // asign models in their name.
  });
 
// When you use associate function in DB , pass db (all database)
Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
// db.Sequelize = Sequelize;

module.exports = db;
