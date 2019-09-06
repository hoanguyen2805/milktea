import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Products } from '../models/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  formInsert: FormGroup;
  formUpdate: FormGroup;
  products: Products[];
  modalRef: BsModalRef;
  updateProduct: Products;
  constructor(private productService: ProductService,
    private fb: FormBuilder,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.formInsert = this.fb.group({
      name: ['', Validators.required],
      mota: ['', Validators.required],
      gia: [0, Validators.required],
      loai: ['milktea', Validators.required],
      image: ['', Validators.required]
    });


    this.productService.getProducts().subscribe(
      products => this.products = products
    );
  }
  insert() {
    const insertProduct: Products = new Products();
    insertProduct.gia = this.formInsert.value.gia + '';
    insertProduct.name = this.formInsert.value.name;
    insertProduct.images = '/assets/images/' + this.formInsert.value.image.slice(12);
    insertProduct.mota = this.formInsert.value.mota;
    insertProduct.loai = this.formInsert.value.loai;
    insertProduct.luotxem = 1;
    this.productService.insertProductByAdmin(insertProduct).subscribe(
      product => {
        // this.products.push(product)
        alert('Success');
        window.location.reload();
      }
    );
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  xoa(_id: string) {
    this.productService.deleteProductByAdmin(_id).subscribe(
      _ => {
        alert('Xóa thành công!');
        this.products = this.products.filter(eachProduct => eachProduct._id !== _id);
      }
    );
  }
  truyendulieu(product: Products) {
    // console.log(JSON.stringify(product));
    this.updateProduct = product;
    this.formUpdate = this.fb.group({
      nameUpdate: [product.name, Validators.required],
      motaUpdate: [product.mota, Validators.required],
      giaUpdate: [product.gia, Validators.required],
      loaiUpdate: [product.loai, Validators.required],
      // imageUpdate: [product.images, Validators.required]
    });
  }
  update() {
    this.updateProduct.name = this.formUpdate.value.nameUpdate;
    this.updateProduct.mota = this.formUpdate.value.motaUpdate;
    this.updateProduct.gia = this.formUpdate.value.giaUpdate;
    this.updateProduct.loai = this.formUpdate.value.loaiUpdate;
    this.productService.updateProduct(this.updateProduct).subscribe(
      () => {
        alert('Thành công!');
        this.modalRef.hide();
      }
    );
  }
}

