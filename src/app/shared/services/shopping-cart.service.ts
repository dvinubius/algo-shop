import { Injectable } from '@angular/core';
import { Subject, Observable, ReplaySubject } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { ShoppingCart } from 'src/app/shopping/models/shopping-cart.model';
import { map, switchMap, tap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private _cart: ShoppingCart = new ShoppingCart();
  public shoppingCart$ = new ReplaySubject<ShoppingCart>(1);

  constructor(private afDb: AngularFireDatabase) {
    this.shoppingCart$.next(this._cart);
  }

  private _createCart() {
    return this.afDb.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private _getCart(id: string) {
    return this.afDb.object('shopping-carts/' + id);
  }

  addProduct(product: Product) {
    const add = (id) => {
      this._cart.add(product);
      this.afDb.object('shopping-carts/' + id).set(this._cart);
      this.shoppingCart$.next(this._cart);
    };

    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      this._createCart().then(result => {
        localStorage.setItem('cartId', result.key);
        add(result.key);
      });
    } else {
      add(cartId);
    }
  }

  removeProduct(product: Product) {
    this._cart.remove(product);
    this.shoppingCart$.next(this._cart);
  }

  get totalOnCart$(): Observable<number> {
    return this.shoppingCart$.pipe(
      // tap(val => console.log('new cart ', val)),
      switchMap(cart => cart.getTotalQuantity())
    );
  }

  getQuantityOf(product: Product): number {
    return this._cart.quantityOf(product);
  }
}
