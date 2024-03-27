import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-poduct-details',
  templateUrl: './poduct-details.component.html',
  styleUrls: ['./poduct-details.component.css']
})
export class PoductDetailsComponent implements OnInit {
  product_details: any = {}
  product: any[] = []
  user: any = {}

  constructor(private us: UserService,private route: Router,private router: ActivatedRoute, private prod: ProductService, private carts: CartService){
    prod.getProductHttp().subscribe(data =>{
      this.product = data
      let id = this.router.snapshot.params['id']
      
      prod.getProductByIDHttp(id).subscribe(data =>{
        this.product_details = data        
      })
    })
  }

  ngOnInit(): void {
      this.user = this.us.getUser()
  }

  check_qty(item: any) {
    let quantity = this.qty;

    if (quantity < 1) {
      quantity = 1;
    } else if (quantity > item.qty) {
      quantity = item.qty;
    }

    this.qty = quantity;
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
