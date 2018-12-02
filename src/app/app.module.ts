import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { LoginComponent } from './auth/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './auth/guards/login.guard';
import { AdminGuard } from './auth/guards/admin.guard';
import { MaterialModule } from './material-module/material.module';
import { HomeComponent } from './core/home/home.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingModule } from './shopping/shopping.module';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminModule } from './admin/admin.module';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
  {path: '**', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MaterialModule,
    AuthModule,
    CoreModule,
    ShoppingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
