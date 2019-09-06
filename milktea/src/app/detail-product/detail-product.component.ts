import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Products } from '../models/product';
import { ProductService } from '../service/product.service';
import { AuthService } from '../service/auth.service';
import { CartService } from '../service/cart.service';
import { Carts } from '../models/cart';
import { Comments } from '../models/comment';
@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  product: Products = new Products();
  comment: Comments = new Comments();
  comments: Comments[];
  _id: string;
  so = 1;
  today: number;
  constructor(private productService: ProductService, private route: ActivatedRoute
    , private authService: AuthService, private router: ActivatedRoute,
    private cartService: CartService) { }

  ngOnInit() {
    this.router.paramMap.subscribe((params: ParamMap) => {
      this._id = params.get('id');
      this.getProductbyID();
    });
    this.getComments();
  }
  getProductbyID() {
    this.productService.getProductbyID(this._id).subscribe(
      product => {
        this.product = product;
        this.product.luotxem = + this.product.luotxem + 1;
        this.productService.updateLuotXem(this.product).subscribe(
          () => {
          }
        );
      }
    );
  }
  getComments() {
    this.productService.getComments(this._id).subscribe(
      res => this.comments = res.reverse()
    );
  }
  addCart(money: number) {
    if (!this.authService.loggedIn()) {
      alert('Chưa đăng nhập!');
    } else if (this.so < 1) {
      alert('Tối thiểu là 1!');
    } else {
      console.log(money);
      const newCart: Carts = new Carts();
      newCart.id_product = this._id;
      newCart.ten_hang = this.product.name;
      newCart.gia = this.product.gia;
      newCart.soluong = this.so;
      newCart.tongtien = money;
      newCart.trangthai = 'Chờ xác nhận';
      newCart.email = this.authService.decodeTokenEmail(localStorage.getItem('token'));
      const d = new Date();
      newCart.thoigiandathang = d.getHours() + ':' + d.getMinutes() + ' ' + d.getDate()
      + '-' + (+ d.getMonth() + 1 ) + '-' + d.getFullYear();
      this.cartService.insertCart(newCart).subscribe(
        cart => {
          alert('Đặt hàng thành công! Hãy kiểm tra giỏ hàng');
          this.so = 1;
        });
    }
  }
  sendComment(comment: String) {
    if (!this.authService.loggedIn()) {
      alert('Hãy đăng nhập!');
    } else {
      this.comment.noidung = comment;
      this.comment.email = this.authService.decodeTokenEmail(localStorage.getItem('token'));
      this.comment.idProduct = this._id;
      const d = new Date();
      this.comment.time = d.getHours() + ':' + d.getMinutes() + ' ' + d.getDate()
      + '-' + (+ d.getMonth() + 1 ) + '-' + d.getFullYear();
      this.productService.insertComment(this.comment).subscribe(
        res => {
          alert('Thanh Cong!');
          this.comments.unshift(this.comment);
        }
      );
    }
  }
}
