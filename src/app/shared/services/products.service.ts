import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product.model';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  allProducts$: Observable<Product[]>;
  constructor(private afDB: AngularFireDatabase) {
    this.allProducts$ = this.afDB.list('/products').snapshotChanges().pipe(
      // tap(entries => {
      //   debugger;
      // }),
      map(entries => entries.map(entry =>
        ({...entry.payload.val(), id: entry.key} as Product)
      ))
    );
  }

  fetchAll(): Observable<Product[]> {
    return this.allProducts$;
  }

  fetchProductsMatching(term: string) {
    return this.allProducts$.pipe(
      map(products => products.filter(p => {
        const re = new RegExp('\\b' + term, 'gi');
        return p.title.match(re);
      }))
    );
  }

  createProduct(product: Product) {
    return this.afDB.list('/products').push(product);
  }

  updateProduct(id: string, product: Product) {
    return this.afDB.object('/products/' + id).update(product);
  }

  deleteProduct(id: string) {
    this.afDB.object('/products/' + id).remove();
  }
}
