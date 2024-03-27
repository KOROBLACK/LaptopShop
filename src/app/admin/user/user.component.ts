import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from 'src/app/user.service';
import * as bcrypt from "bcryptjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  users: any[] = []
  search: string = ''

  filterData(){
    let dataFilter = this.users

    if (this.search){
      dataFilter = dataFilter.filter(item =>{
        return item.email.toLowerCase().includes(this.search.toLowerCase())
      })
    }

    return dataFilter
  }

  constructor(private us: UserService, private http: HttpClient) {
    us.getUsers().subscribe(data =>{
      this.users = data
      this.users = this.users.filter(item => item.role !== 'admin')
    })

    let password = '12345'
    let hashpass = bcrypt.hashSync(password, 10)
    console.log(hashpass);
  }
}
