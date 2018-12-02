import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module/material.module';
import { RouterModule } from '@angular/router';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { SharedModule } from '../shared/shared.module';
import { EditProductDialogComponent } from './admin-products/edit-product-dialog/edit-product-dialog.component';
import { FormsModule } from '@angular/forms';
import { ProductsTableComponent } from './table/products-table.component';

export const adminRoutes = [
  {path: 'orders', component: AdminOrdersComponent},
  {path: 'products', component: AdminProductsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild(adminRoutes)
  ],
  declarations: [
    AdminOrdersComponent,
    AdminProductsComponent,
    EditProductDialogComponent,
    ProductsTableComponent
  ],
  entryComponents: [
    EditProductDialogComponent
  ]
})
export class AdminModule { }
