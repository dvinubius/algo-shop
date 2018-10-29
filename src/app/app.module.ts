import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { ShopMaterialModule } from './shop-material/shop-material.module';
import { ShoppingCartComponent } from './view/shopping-cart/shopping-cart.component';
import { HomeComponent } from './view/home/home.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { ProductsComponent } from './view/products/products.component';
import { CheckOutComponent } from './view/check-out/check-out.component';
import { OrderSuccessComponent } from './view/order-success/order-success.component';
import { MyOrdersComponent } from './view/my-orders/my-orders.component';
import { AdminProductsComponent } from './view/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './view/admin/admin-orders/admin-orders.component';
import { LoginComponent } from './auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ShoppingCartComponent,
    HomeComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ShopMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
