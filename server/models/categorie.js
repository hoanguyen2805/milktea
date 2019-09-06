const mongoose = require('mongoose')

const Schema = mongoose.Schema
const categorieSchema = new Schema({
    name: String,
    mota: String,
    loai: String,
    images: String,
})
module.exports = mongoose.model('categorie', categorieSchema, 'categories')
//users la cai collections trong database