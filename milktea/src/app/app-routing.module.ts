import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterAuth } from './guards/register.guard';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { AdminComponent } from './admin/admin.component';

import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { CartAdminComponent } from './cart-admin/cart-admin.component';
const routes: Routes = [
  // canActivate:[AuthGuard]
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [RegisterAuth] },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'detail-product/:id', component: DetailProductComponent },
  { path: 'categories/:name', component: CategoriesComponent },
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: '', redirectTo: 'user', pathMatch: 'full' },
      { path: 'user', component: UserComponent },
      { path: 'product', component: ProductComponent },
      { path: 'cart', component: CartAdminComponent }
    ], canActivate: [AuthAdminGuard]
  },
  { path: ' ', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
