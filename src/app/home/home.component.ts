import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  product: any[] = [];
  newhot: any = {}
  user: any = {}

  constructor(private prod: ProductService, private us: UserService, private route: Router, private carts: CartService) {
    prod.getProductHttp().subscribe(data =>{
      this.product = data

      this.newhot = this.getNewHot()
    });

    this.user = this.us.getUser()
  }

  getNewHot(){
    let newhot = this.getPoductHot()
    newhot = newhot[0]

    return newhot
  }

  getSale() {
    return this.product.filter((item) => {
      return item.sale !== 0;
    }).slice(0,4);
  }

  getPoductHot(){
    let product_hot = [...this.product]
    product_hot.sort((a,b) =>{
      return b.view - a.view
    })

    return product_hot.slice(0, 3)
  }


  qty: number = 1
  addCart(item: any) {
    if (this.user.username){
      this.product.forEach((element) => {
        if (element.name == item.name) {
          let cart_item = {
            id: item.id,
            img: item.img,
            name: item.name,
            qty: this.qty,
            price: item.price,
            sale: item.sale,
            inventory: element.qty,
            total: item.sale == 0 ? item.price * this.qty : item.sale * this.qty,
            checked: item.checked
          };
  
          this.carts.addCart(cart_item, item.id);
  
          alert('Add cart suscess');
        }
      });
    }
    else{
      alert("Please sign in to continue")
      this.route.navigate(['/signin'])
    }
  }
}
