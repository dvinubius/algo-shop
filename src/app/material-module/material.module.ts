import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatMenuModule,
  MatInputModule,
  MatSortModule,
  MatPaginatorModule,
  MatTableModule,
  MatDialogModule,
  MatSelectModule,
  MatCardModule,
  MatListModule,
  MatCheckboxModule,
  MatGridListModule,
  MatBadgeModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FlexLayoutModule,
    MatDialogModule,
    MatSelectModule,
    MatCardModule,
    MatListModule,
    MatCheckboxModule,
    MatGridListModule,
    MatBadgeModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FlexLayoutModule,
    MatDialogModule,
    MatSelectModule,
    MatCardModule,
    MatListModule,
    MatCheckboxModule,
    MatGridListModule,
    MatBadgeModule
  ]
})
export class MaterialModule { }
