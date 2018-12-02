import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { take, map, switchMap } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { MatListOption } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ShoppingCart } from '../../models/shopping-cart.model';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  categories: {name: string}[] = [];
  selection = new SelectionModel<{name: string}>(true, []);
  products$: Observable<Product[]>;
  filtered$ = new Subject<any>();

  constructor(private categoryService: CategoryService,
    private productService: ProductsService,
    private shoppingCartSvc: ShoppingCartService) { }

  ngOnInit() {
    this.categoryService.allCategories$.pipe(
      take(1)
    ).subscribe(cats => {
      this.categories = cats;
      this.categories.forEach(cat => this.selection.select(cat));
      this.filtered$.next();
    });

    this.products$ = this.filtered$.pipe(
      switchMap(() => this.productService.allProducts$),
      map(products => products.filter( product => {
        return this.selection.selected.some(cat => cat.name.toLocaleLowerCase().includes(product.category.toLocaleLowerCase()));
      }))
    );
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.categories.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.categories.forEach(row => this.selection.select(row));
  }

  selectionChanged(newSelection: SelectionModel<MatListOption>) {
    const selectedLabels = newSelection.selected.map(option => option.getLabel().trim());

    this.categories.forEach(cat => {
      if (selectedLabels.includes(cat.name)) {
        this.selection.select(cat);
      } else {
        this.selection.deselect(cat);
      }
    });

    this.filtered$.next();
  }

  getQuantityOf(product: Product): number {
    return this.shoppingCartSvc.getQuantityOf(product);
  }

  incQuantity(product: Product) {
    this.shoppingCartSvc.addProduct(product);
  }
  decQuantity(product: Product) {
    this.shoppingCartSvc.removeProduct(product);
  }
}

