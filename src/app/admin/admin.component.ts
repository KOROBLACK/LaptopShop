import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  user: any = {}

  constructor(private us: UserService, private router: Router){
    this.user = us.getUser()        
  } 

  link: string = 'dashboard'

  logout(){
    this.us.user = {}
    this.user = this.us.user
    this.router.navigate(['/'])
  }
}
