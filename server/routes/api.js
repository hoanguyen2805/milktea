const express = require('express')
const router = express.Router()
const Account = require('../models/account')
const Product = require('../models/product')
const Cart = require('../models/cart')
const Categorie = require('../models/categorie')
const Comment = require('../models/comment')
const Slide = require('../models/slide')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
// const db = "mongodb://hoadeptrai:Hoa2851998@ds161306.mlab.com:61306/eventsdb"
const db = "mongodb://127.0.0.1:27017/milktea"
// mongoose.connect(db, err => {
//   if (err) {
//     console.error('error!' + err)
//   }
//   else {
//     console.log('Connected to mongodb')
//   }
// })

mongoose.connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('mongoDB is connected...')
  })
  .catch((err) => {
    throw err
  })
function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if (token === 'null') {
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'secretKey')
  if (!payload) {
    return res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject
  next()
}


// người dùng lấy ra thông tin cá nhân = _id
// Account là cái collection (bảng) trong database
// verifyToken là cái xác thực token có đúng là token đã gửi keyofo, hay là token giả mạo
// req.userId là _id được lấy ra nhờ giải mã token gửi lại (giải mã ở verifyToken)
// err là lỗi
// account là giá trị database trả lại sau khi truy vấn
router.get('/userprofile', verifyToken, (req, res) => {
  Account.findById(req.userId, (err, account) => {
    if (err) {
      console.log(err)
    }
    else {
      res.json(account)
    }
  })
})

router.get('/getslide', verifyToken, (req, res) => {
  Slide.find({}, (err, slides) => {
    if (err) {
      console.log(err)
    }
    else {
      res.json(slides)
    }
  })
})
router.get('/getshowslide', (req, res) => {
  Slide.find({ show: true }, (err, slides) => {
    if (err) {
      console.log(err)
    }
    else {
      res.json(slides)
    }
  })
})

router.put('/updateShow', verifyToken, (req, res) => {
  let updateShow = req.body
  let slide = new Slide(updateShow)
  Slide.findByIdAndUpdate(slide._id, { $set: { "show": slide.show } }, function (err, success) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(success)
    }
  })
})
router.post('/insertSlide', verifyToken, (req, res) => {
  let newSlide = req.body
  let slide = new Slide(newSlide)
  slide.save((err, slided) => {
    if (err) {
      console.log(err)
    }
    else {
      res.json(slided)
    }
  })
})
router.delete('/deleteSlide/:id', verifyToken, (req, res) => {
  let _id = req.params.id
  Slide.findByIdAndDelete({ _id: _id }, function (err, deleted) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(deleted)
    }
  })
})
//Lấy ra danh sách sản phẩm + phân trang bằng id
// limit là 4 sản phẩm, skip là lấy ra ở vị trí 
router.get('/products/:id', (req, res) => {
  Product.find().limit(4).skip(4 * (req.params.id - 1))
    .exec(function (err, products) {
      if (err) {
        console.log(err)
      }
      else {
        res.json(products)
      }
    })
})


//Search danh sách sản phẩm theo name (phần search trong menu)
// phần name: new RegExp(chuoi, "i")  là tìm kiếm theo name với điều kiện là chuoi và không phân biệt chữ hoa thường
router.get('/searchProducts/:name', (req, res) => {
  var chuoi = req.params.name
  Product.find({ name: new RegExp(chuoi, "i") }, function (err, listProduct) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(listProduct)
    }
  })
})

router.get('/getHightLightProduct', (err, res) => {
  Product.find().sort({ "_id": -1 }).limit(4).exec(function (err, listProduct) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(listProduct)
    }
  })
})

// Noi dung gan day
router.post('/recentProduct', (req, res) => {
  let id = req.body
  Product.find().where('_id').in(id.mang).exec(function (err, listProduct) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(listProduct)
    }
  })
})
// END

// lấy ra chi tiết sản phẩm
router.get('/getProduct/:id', (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) {
      console.log(err)
    }
    else {
      res.json(product)
    }
  })
})

// user thêm sản phẩm vào giỏ hàng
router.post('/addCart', verifyToken, (req, res) => {
  let productCart = req.body
  let cart = new Cart(productCart)
  cart.id_user = req.userId
  cart.save((err, carted) => {
    if (err) {
      console.log(err)
    }
    else {
      res.json(carted)
    }
  })

})

// user lấy ra giỏ hàng của nó với cột id_user 
router.get('/getCart', verifyToken, (req, res) => {
  let user_id = req.userId
  Cart.find({ id_user: user_id }, function (err, carts) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(carts)
    }
  })
})

// lấy ra 1 cái categories 
router.get('/categorie/:name', (req, res) => {
  let loai = req.params.name
  Categorie.findOne({ loai: loai }, function (err, categorie) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(categorie)
    }
  })
})

// lấy ra sản phẩm dựa trên loại (categories)
router.get('/getProductByLoai/:loai', (req, res) => {
  let loai = req.params.loai
  Product.find({ loai: loai }, function (err, products) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(products)
    }
  })
})
router.get('/getHotProduct', (err, res) => {
  Product.find().sort({ "luotxem": -1 }).limit(4).exec(function (err, listProduct) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(listProduct)
    }
  })
})

// user xóa 1 đơn hàng trong giỏ hàng  
router.delete('/deleteCart/:id', verifyToken, (req, res) => {
  let _id = req.params.id
  Cart.findByIdAndDelete({ _id: _id }, function (err, deletedCart) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(deletedCart)
    }
  })
})

// admin lấy ra toàn bộ user, không lấy ra admin nhé (nhờ vào điều kiện admin: false)
router.get('/getuser', verifyToken, (req, res) => {
  Account.find({ admin: false }, function (err, accounts) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(accounts)
    }
  })
})

// admin lấy ra toàn bộ sản phẩm
router.get('/getproducts', verifyToken, (req, res) => {
  Product.find({}, function (err, products) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(products)
    }
  })
})

// admin lấy ra toàn bộ giỏ hàng
router.get('/getListCart', verifyToken, (req, res) => {
  Cart.find({}, function (err, carts) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(carts)
    }
  })
})

// admin cập nhật 1 giỏ hàng
router.put('/updateCart', verifyToken, (req, res) => {
  let updateCart = req.body
  let cart = new Cart(updateCart)
  Cart.findByIdAndUpdate(cart._id, cart, function (err, trave) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(trave)
    }
  })
})

router.patch('/updateLuotXem', (req, res) => {
  let updateLuotXem = req.body
  let product = new Product(updateLuotXem)
  // product.luotxem = +product.luotxem + 1
  console.log(product.luotxem);
  Product.findByIdAndUpdate(product._id, product, function (err, succ) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(succ)
    }
  })
})

// admin xóa 1 giỏ hàng bằng _id của giỏ hàng đó
router.delete('/delteCartByAdmin/:id', verifyToken, (req, res) => {
  let _id = req.params.id
  Cart.findByIdAndDelete({ _id: _id }, function (err, deletedCart) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(deletedCart)
    }
  })
})

// admin xóa user bằng _id của user đó
router.delete('/deleteUserById/:id', verifyToken, (req, res) => {
  let _id = req.params.id
  Account.findByIdAndDelete({ _id: _id }, function (err, deletedUser) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(deletedUser)
    }
  })
})

// admin update thông tin user với _id của user đó
router.put('/updateUserByAdmin', verifyToken, (req, res) => {
  let user = req.body
  let updateUser = new Account(user)
  Account.findByIdAndUpdate(updateUser._id, updateUser, function (err, trave) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(trave)
    }
  })
})

router.put('/updateProfileByUser', verifyToken, (req, res) => {
  let user = req.body
  let updateUser = new Account(user)
  Account.findByIdAndUpdate(updateUser._id, updateUser, function (err, trave) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(trave)
    }
  })
})

router.put('/updateProduct', verifyToken, (req, res) => {
  let product = req.body
  let updateProduct = new Product(product)
  Product.findByIdAndUpdate(updateProduct._id, updateProduct, function(err, success) {
    if(err){
      console.log(err)
    }
    else{
      res.json(success)
    }
  })
})
// admin thêm 1 sản phẩm
router.post('/insertProduct', verifyToken, (req, res) => {
  let product = req.body
  let productInsert = new Product(product)
  productInsert.save((err, productInserted) => {
    if (err) {
      console.log(err)
    }
    else {
      res.json(productInserted)
    }
  })
})

// admin xóa 1 sản phẩm bằng _id của sản phẩm đó
router.delete('/deleteProductByAdmin/:id', verifyToken, (req, res) => {
  let _id = req.params.id
  Product.findByIdAndDelete({ _id: _id }, function (err, deletedProduct) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(deletedProduct)
    }
  })
})
// router.get('/events', (req, res) => {
//   Movie.find({}, '_id', function (err, movies) {
//     if (err) {
//       console.log(err)
//     }
//     else {
//       res.json(movies)
//     }
//   }

//   )
//   //res.json(events)
// })

//them binh luan
router.post('/addcomment', verifyToken, (req, res) => {
  let binhluan = req.body
  let comment = new Comment(binhluan)
  comment.save((err, commented) => {
    if (err) {
      console.log(err)
    }
    else {
      res.json(commented)
    }
  })

})
router.get('/getComments/:id', (req, res) => {
  let idProduct = req.params.id
  Comment.find({ idProduct: idProduct }, function (err, listComments) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(listComments)
    }
  })
})

//tạo tài khoản
router.post('/register', (req, res) => {
  let accountData = req.body
  let account = new Account(accountData)
  account.save((err, registeredAccount) => {
    if (err) {
      console.log(err)
    } else {
      let payload = { subject: registeredAccount._id, email: registeredAccount.email }
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({ token, registeredAccount })
    }
  })
})


//login 
router.post('/login', (req, res) => {
  let accountData = req.body
  Account.findOne({ email: accountData.email }, (err, account) => {
    if (err) {
      console.log(err)
    } else {
      if (!account) {
        res.status(401).send('Invalid Email')
      } else
        if (account.password !== accountData.password) {
          res.status(401).send('Invalid Password')
        } else {
          let payload = { subject: account._id, admin: account.admin, email: account.email }
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({ token, account })
        }
    }
  })
})
module.exports = router