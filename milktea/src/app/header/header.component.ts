import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Accounts } from '../models/account';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Products } from '../models/product';
import { ProductService } from '../service/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  admin: boolean;
  products$: Observable<Products[]>;
  private searchSubject = new Subject<string>();
  modalRef: BsModalRef;
  loginForm: FormGroup;
  account: Accounts;
  isCollapsed = true;
  _isLogged: boolean;
  returnUrl: string;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private productService: ProductService,
    private modalService: BsModalService) { }
  ngOnInit() {
    this.products$ = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchedString: string) =>
        this.productService.searchProducts(searchedString)
      )
    );
    this.loginForm = this.fb.group({
      email: [localStorage.getItem('email'), [Validators.required, Validators.email]],
      password: ['', [Validators.required, ]],
      checkremember: true
    });
    if (!!localStorage.getItem('token')) {
      this._isLogged = true;
    }
    this.admin = this.authService.decodeToken(localStorage.getItem('token'));

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  search(searchedString: string) {
    this.searchSubject.next(searchedString);
  }
  onSubmit() {
    this.authService.login({ 'email': this.loginForm.value.email, 'password': this.loginForm.value.password }).subscribe(
      res => {
        if (this.loginForm.value.checkremember) {
          console.log(this.loginForm.value.checkremember);
          localStorage.setItem('email', this.loginForm.value.email);
        } else {
          localStorage.removeItem('email');
        }
        localStorage.setItem('token', res.token);
        console.log('thanh cong \n Token: ' + localStorage.getItem('token'));
        this._isLogged = true;
        this.admin = this.authService.decodeToken(localStorage.getItem('token'));
        this.modalRef.hide();
        // window.location.reload();
      },
      err => {
        console.log(err);
        this._isLogged = false;
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            alert('Đăng nhập thất bại!');
          }
        }
      }
    );
  }
  logOut() {
    this.authService.logoutUser();
    this._isLogged = false;
    window.location.reload();
  }
  xuly(chuoi: String) {
    if (chuoi.trim().length === 0) {
      this.isCollapsed = true;
    } else {
      this.isCollapsed = false;
    }
  }

}
