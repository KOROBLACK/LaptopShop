import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  product: any[] = [];

  min: number = 0;
  max: number = 30000000;
  min_range: number = 0;
  max_range: number = 30000000;

  productFilter() {
      return this.product.filter((item) => {
        return item.price >= this.min && item.price <= this.max;
      })
  }

  constructor(private prod: ProductService, private cart: CartService) {
    prod.getProductHttp().subscribe((data) => {
      this.product = data;
    });
  }
}
