import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductsComponent } from './components/products/products.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material-module/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';

export const productsRoutes = [
  {path: 'products',      component: ProductsComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'order-success', component: OrderSuccessComponent},
  {path: 'my/orders',     component: MyOrdersComponent, canActivate: [AuthGuard]},
  {path: 'check-out',     component: CheckOutComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productsRoutes),
    MaterialModule,
    FlexLayoutModule,
    SharedModule
  ],
  declarations: [
    CheckOutComponent,
    MyOrdersComponent,
    OrderSuccessComponent,
    ProductsComponent,
    ShoppingCartComponent,
    ProductQuantityComponent
  ]
})
export class ShoppingModule { }
