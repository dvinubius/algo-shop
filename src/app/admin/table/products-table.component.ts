import { Component, OnInit, ViewChild, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TableDataSource } from './products-table-datasource';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent implements OnInit, OnChanges {
  @Input() products: Product[];
  @Output() editProduct = new EventEmitter<string>();
  @Output() deleteProduct = new EventEmitter<string>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'category', 'price', 'edit', 'delete'];

  ngOnInit() {
    this.dataSource = new TableDataSource(this.paginator, this.sort, this.products);
  }

  ngOnChanges(): void {
    this.dataSource = new TableDataSource(this.paginator, this.sort, this.products);
  }

  editRequested(product: Product) {
    this.editProduct.emit(product.id);
  }

  deleteRequested(product: Product) {
    this.deleteProduct.emit(product.id);
  }
}
