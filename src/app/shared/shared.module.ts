import { NgModule } from '@angular/core';
import { MaterialModule } from '../material-module/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [ProductCardComponent],
  exports: [ProductCardComponent]
})
export class SharedModule {}
