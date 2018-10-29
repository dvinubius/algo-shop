import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { ShoppingCartComponent } from './view/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './view/check-out/check-out.component';
import { ProductsComponent } from './view/products/products.component';
import { OrderSuccessComponent } from './view/order-success/order-success.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminProductsComponent } from './view/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './view/admin/admin-orders/admin-orders.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products',      component: ProductsComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'check-out',     component: CheckOutComponent},
  {path: 'order-success', component: OrderSuccessComponent},

  {path: 'login',         component: LoginComponent},
  {path: 'my-orders',     component: ShoppingCartComponent},

  {path: 'admin-products',  component: AdminProductsComponent},
  {path: 'admin-orders',    component: AdminOrdersComponent},

  {path: '**', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
