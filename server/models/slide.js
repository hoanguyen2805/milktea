const mongoose = require('mongoose')

const Schema = mongoose.Schema
const slideSchema = new Schema({
    name : String,
    path : String,
    show: Boolean
})
module.exports = mongoose.model('slide', slideSchema, 'slides')