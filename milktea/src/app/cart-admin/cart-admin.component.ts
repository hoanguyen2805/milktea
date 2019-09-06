import { Component, OnInit } from '@angular/core';
import { Carts } from '../models/cart';
import { CartService } from '../service/cart.service';
@Component({
  selector: 'app-cart-admin',
  templateUrl: './cart-admin.component.html',
  styleUrls: ['./cart-admin.component.css']
})
export class CartAdminComponent implements OnInit {
  carts: Carts[];
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getListCart().subscribe(
      carts => this.carts = carts.reverse()
    );
  }
  update(trangthai: string, cart: Carts, soluong: number) {
    cart.trangthai = trangthai;
    cart.soluong = soluong;
    cart.tongtien = +cart.gia * +soluong;
    this.cartService.updateCartById(cart).subscribe(
      res => alert('Sửa đổi thành công!')
    );
  }
  deleteCart(_id: string) {
    this.cartService.deleteCartByAdmin(_id).subscribe(
      _ => this.carts = this.carts.filter(
        eachCart => eachCart._id !== _id
      )
    );
  }
}
