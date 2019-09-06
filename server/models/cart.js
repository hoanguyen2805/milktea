const mongoose = require('mongoose')

const Schema = mongoose.Schema
const cartSchema = new Schema({
    id_user: String,
    email: String,
    id_product: String,
    ten_hang: String,
    gia: String,
    soluong: Number,
    tongtien: Number,
    thoigiandathang: String,
    trangthai : String
})
module.exports = mongoose.model('cart', cartSchema, 'carts')
//users la cai collections trong database