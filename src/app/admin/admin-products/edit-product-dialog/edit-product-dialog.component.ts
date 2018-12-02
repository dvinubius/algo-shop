import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Product } from 'src/app/shared/models/product.model';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.scss']
})
export class EditProductDialogComponent implements OnInit {

  categories$: Observable<{name: string}[]>;

  product: Product = {
    title: '',
    category: '',
    imageUrl: 'https://placekitten.com/300/300',
    price: null
  };

  constructor(
      public dialogRef: MatDialogRef<EditProductDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Product,
      public categoryService: CategoryService
  ) {}

  ngOnInit() {
    if (this.data) {
      this.product = this.data;
    }

    this.categories$ = this.categoryService.allCategories$;
  }

  onSave(): void {
    this.dialogRef.close(this.product);
  }
}
