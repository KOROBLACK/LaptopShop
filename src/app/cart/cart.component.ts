import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { CheckoutService } from '../checkout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cart: any[] = [];
  product_checkout: any[] = [];

  total: number = 0;
  checked(event: any, item: any){
    let id = event.target.value
    let ischecked = event.target.checked
    
    this.cart = this.cart.map(item =>{
      if (item.id == id){
        item.checked = ischecked
        return item
      }
      return item
    })

    this.add(item)
    this.caculator_total()
  }

  add(item: any){
    if (item.checked) {
      this.checkout.addCheckOut(item);
    } else {
      let index = this.product_checkout.findIndex((element) => {
        return element == item;
      });

      this.product_checkout.splice(index, 1);
    }
  }

  caculator_total() {
    this.total = this.product_checkout.reduce((total, element) => {
      return (total += element.total);
    }, 0);
  }

  update_cart(item: any) {
    let index = this.product_checkout.findIndex((element) => {
      return element == item;
    });

    this.check_qty(item);
    item.total = item.sale == 0 ? item.qty * item.price : item.qty * item.sale;

    if (index != -1) {
      this.product_checkout[index] = item;
      this.total = this.product_checkout.reduce((total, item) => {
        return (total += item.total);
      }, 0);
    }
  }

  check_qty(item: any) {
    if (item.qty < 1) {
      item.qty = 1;
    } else if (item.qty > item.inventory) {
      item.qty = item.inventory;
    }
  }

  delete_cart(item: any, index: any) {
    if (confirm('Confirm removal from cart?')) {
      this.carts.delete(index)
      this.cart = this.carts.getCart()
            
      let indexCheckOut = this.product_checkout.findIndex((element) => {
        return element == item;
      });

      if (indexCheckOut != -1) {
        this.product_checkout.splice(indexCheckOut, 1);
      }

      this.total = this.product_checkout.reduce((total, item) => {
        return (total += item.total);
      }, 0);
    }
  }

  goToCheckout(){
    if (this.product_checkout.length == 0){
      alert('Please select a product to proceed to the checkout')
    }
    else{
      this.router.navigate(['/checkout'])
    }
  }

  constructor(private carts: CartService, private checkout: CheckoutService, private router: Router) {
    this.cart = carts.getCart();
    this.product_checkout = checkout.getCheckout();    

    this.caculator_total()
  }
}
