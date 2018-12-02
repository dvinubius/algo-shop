import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Observable, timer, Subject, BehaviorSubject } from 'rxjs';
import { debounce, distinctUntilChanged, mergeMap, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { EditProductDialogComponent } from './edit-product-dialog/edit-product-dialog.component';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  productsSnapshot: Product[] = [];
  search$: Subject<string>;

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.search$ = new BehaviorSubject('');

    this.products$  = this.search$.pipe(
      debounce(() => timer(200)),
      distinctUntilChanged(),
      mergeMap(term => this.productsService.fetchProductsMatching(term))
    );

    this.products$.subscribe(prods => this.productsSnapshot = prods.slice());
  }

  openEditProduct(id: string) {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '640px',
      height: '480px',
      data: id ? this._findProduct(id) : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      if (!!id) {
        this.productsService.updateProduct(id, result);
      } else {
        this.productsService.createProduct(result);
      }
    });
  }

  private _findProduct(id: string) {
    return this.productsSnapshot.find(p => p.id === id);
  }

  deleteProduct(id: string) {
    this.productsService.deleteProduct(id);
  }
}
