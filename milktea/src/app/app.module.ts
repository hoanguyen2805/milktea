import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AuthGuard } from './guards/auth.guard';
import {RegisterAuth} from './guards/register.guard';
import { AuthAdminGuard } from './guards/auth-admin.guard';

import { AuthService } from './service/auth.service';
import { ProductService } from './service/product.service';
import {TokenInterceptorService} from './service/interceptor.service';
import { CartService } from './service/cart.service';

import { AppComponent } from './app.component';



import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SliderComponent } from './slider/slider.component';
import { HotThemeComponent } from './hot-theme/hot-theme.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { CartAdminComponent } from './cart-admin/cart-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SliderComponent,
    HotThemeComponent,
    RegisterComponent,
    UserProfileComponent,
    DetailProductComponent,
    CartComponent,
    CategoriesComponent,
    AdminComponent,
    UserComponent,
    ProductComponent,
    CartAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [AuthService, CartService, ProductService, AuthGuard, AuthAdminGuard, RegisterAuth,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
