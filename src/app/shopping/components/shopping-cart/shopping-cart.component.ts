import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../../models/shopping-cart.model';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cart$: Observable<ShoppingCart>;

  constructor(private cartSvc: ShoppingCartService) { }

  ngOnInit() {
    this.cart$ = this.cartSvc.shoppingCart$;
  }

  incQuantity(prod: Product) {
    this.cartSvc.addProduct(prod);
  }

  decQuantity(prod: Product) {
    this.cartSvc.removeProduct(prod);
  }
}
