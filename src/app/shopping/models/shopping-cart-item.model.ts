import { Product } from 'src/app/shared/models/product.model';

export class ShoppingCartItem {
  quantity: number;
  constructor(public product: Product) {
    this.quantity = 1;
  }
}
