// models/model.js
var mongoose = require('mongoose')

//Defining a model:
var gameTitle = mongoose.model('gameTitle', {
    title: String,
    dateAdded: String
})

module.exports = gameTitle



