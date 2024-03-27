import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: any[] = []
  user: any = {}

  setUser(user: any){
    this.user = this.users.find(item =>{
        return item.email == user.email && item.password == user.password 
    })
  }

  getUser(){
    return this.user
  }

  getUsers(): Observable<[]>{
    return this.http.get<[]>(this.URL)
  }

  addUsers(User: any){
    return this.http.post<any>(this.URL, {...User, role: "user"})
  }

  private URL = 'http://localhost:3000/users'
  constructor(private http: HttpClient) {
    this.getUsers().subscribe(data =>{
      this.users = data
    })
  }
}
