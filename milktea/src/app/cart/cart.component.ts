import { Component, OnInit } from '@angular/core';
import { Carts } from '../models/cart';
import { CartService } from '../service/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carts: Carts[];
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.getCartByUserId();
  }
  getCartByUserId() {
    this.cartService.getCart().subscribe(
      carts => this.carts = carts.reverse()
    );
  }
  deleteCart(_id: string, trangthai: string) {
    if (trangthai === 'Đã nhận') {
      alert('Đã nhận không được hủy!');
      return;
    }
    this.cartService.deleteCartById(_id).subscribe(
      _ => this.carts = this.carts.filter(eachCart => eachCart._id !== _id)
    );
  }
  updateCart(cart: Carts, soluong: number) {
    console.log(JSON.stringify(cart));
    console.log(soluong);
    cart.soluong = soluong;
    cart.tongtien = +cart.gia * soluong;
    this.cartService.updateCartById(cart).subscribe(
      res => alert('Sửa đổi thành công!')
    );
  }

}
