const mongoose = require('mongoose')

const Schema = mongoose.Schema
const productSchema = new Schema({
    name : String,
    images : String,
    mota : String,
    gia : String,
    loai : String,
    luotxem: Number
})
module.exports = mongoose.model('product', productSchema, 'products')