import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Products } from '../models/product';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listProducts: Products[];
  currentPage = 1;
  page: number;
  constructor(private productService: ProductService) { }
  ngOnInit() {
    this.pageChanged(1);
  }
  pageChanged(event: any): void {
    this.page = event.page;
    this.productService.getListProducts(this.page).subscribe(
      updatemovie => this.listProducts = updatemovie,
    );
  }

}
