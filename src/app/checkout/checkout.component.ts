import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutService } from '../checkout.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  product_checkout: any[] = []
  cart: any[] = []
  subTotal: number = 0;

  constructor(private checkout: CheckoutService, private router: Router, private carts: CartService) {
    this.product_checkout = checkout.getCheckout();
    this.cart = carts.getCart()

    this.subTotal = this.product_checkout.reduce((total, item) => {
      return (total += item.total);
    }, 0);
  }

  formShip = new FormGroup({
    fullname: new FormControl<string>('', [Validators.required]),
    phoneNumber: new FormControl<string>('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    address: new FormControl<string>('', [Validators.required]),
    payment: new FormControl<string>('COD')
  })

  checkOut(){
    if (this.formShip.dirty && this.formShip.valid){
      this.carts.deleteCart(this.product_checkout)
      this.checkout.deleteCheckout()
            
      alert('Checkout success')
      this.router.navigate(['/cart'])
    }
  }
}
