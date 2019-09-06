const mongoose = require('mongoose')

const Schema = mongoose.Schema
const accountSchema = new Schema({
    email: String,
    password: String,
    name: String,
    address: String,
    phone: String,
    admin: Boolean
})
module.exports = mongoose.model('account', accountSchema, 'accounts')
//users la cai collections trong database
