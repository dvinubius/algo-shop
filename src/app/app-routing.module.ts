import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { ShoppingCartComponent } from './view/shopping-cart/shopping-cart.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},

  {path: '**', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
