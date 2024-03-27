import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user: any = {}

  constructor(private us: UserService, private route: Router){
    this.user = us.getUser()        
  } 

  logout(){
    this.us.user = {}
    this.user = this.us.user
    this.route.navigate(['/'])
  }

  goToCart(){
    if (!this.user.username){
      alert("Please sign in to continue")
      this.route.navigate(['/signin'])
    }
  }
}
