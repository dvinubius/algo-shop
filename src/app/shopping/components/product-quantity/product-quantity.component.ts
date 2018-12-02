import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent implements OnInit {

  @Input() quantity: number;

  @Output() incQuantity = new EventEmitter<number>();
  @Output() decQuantity = new EventEmitter<number>();

  incQuant() {
    this.quantity++;
    this.incQuantity.emit();
  }
  decQuant() {
    this.quantity--;
    this.decQuantity.emit();
  }

  constructor() { }

  ngOnInit() {
  }

}
