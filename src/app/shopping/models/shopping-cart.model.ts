import { ShoppingCartItem } from './shopping-cart-item.model';
import { Product } from 'src/app/shared/models/product.model';
import { Subject, Observable, ReplaySubject } from 'rxjs';

export class ShoppingCart {

  private _itemCounter$ = new ReplaySubject<number>(1);

  constructor(public items: ShoppingCartItem[] = []) {
    if (items) {
      const total = this._totalQuant();
      this._itemCounter$.next(total);
    } else {
      this._itemCounter$.next(0);
    }


  }

  add(product: Product) {
    if (this._hasProduct(product)) {
      const index = this._indexOfProduct(product);
      this.items[index].quantity++;
    } else {
      this.items.push(new ShoppingCartItem(product));
    }
    this._itemCounter$.next(this._totalQuant());
  }

  remove(product: Product) {
    if (!this._hasProduct(product)) {
      throw Error('Product not found in shopping cart!');
    }

    const index = this._indexOfProduct(product);
    const quantity = this.items[index].quantity;
    if (quantity === 1) {
      this.items.splice(index, 1);
    } else {
      this.items[index].quantity--;
    }
    this._itemCounter$.next(this._totalQuant());
  }

  quantityOf(product: Product): number {
    if (!this._hasProduct(product)) {
      return 0;
    }
    return this._findItemFor(product).quantity;
  }

  private _totalQuant(): number {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }

  getTotalQuantity(): Observable<number> {
    return this._itemCounter$;
  }

  private _hasProduct(product: Product): boolean {
    return this._indexOfProduct(product) !== -1;
  }

  private _indexOfProduct(product: Product):  number {
    return this.items.findIndex(it => it.product.id === product.id);
  }

  private _findItemFor(product: Product): ShoppingCartItem {
    return this.items.find(it => it.product.id === product.id);
  }

  get totalCost(): number {
    return this.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
  }
}
