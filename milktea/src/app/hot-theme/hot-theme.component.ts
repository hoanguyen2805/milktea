import { Component, OnInit } from '@angular/core';
import { Products } from '../models/product';
import { ProductService } from '../service/product.service';
@Component({
  selector: 'app-hot-theme',
  templateUrl: './hot-theme.component.html',
  styleUrls: ['./hot-theme.component.css']
})
export class HotThemeComponent implements OnInit {
  hotProducts: Products[];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getHotProduct().subscribe(
      hot => this.hotProducts = hot
    );
  }

}
