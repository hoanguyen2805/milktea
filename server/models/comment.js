const mongoose = require('mongoose')

const Schema = mongoose.Schema
const commentSchema = new Schema({
    email: String,
    time: String,
    noidung: String,
    idProduct: String
})
module.exports = mongoose.model('comment', commentSchema, 'comments')
//users la cai collections trong database
