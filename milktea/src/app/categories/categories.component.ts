import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Categories } from '../models/categorie';
import { ProductService } from '../service/product.service';
import { Products } from '../models/product';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categorie: Categories = new Categories();
  products: Products[];
  loai: string;
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.loai = params.get('name');
      this.getCategorie();
      this.getProductByLoai();
    });
  }
  getCategorie() {
    this.productService.getCategories(this.loai).subscribe(
      categorie => this.categorie = categorie
    );
  }
  getProductByLoai() {
    this.productService.getProductByCategories(this.loai).subscribe(
      products => this.products = products
    );
  }
}
