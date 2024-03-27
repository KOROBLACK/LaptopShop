import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  users: any[] = []

  formSignin = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('' ,Validators.required)
  })

  signIn(){
    if (this.formSignin.dirty && this.formSignin.valid){
      const User = {
        email: this.formSignin.get('email')?.value?.toLowerCase(),
        password: this.formSignin.get('password')?.value
      };
  
      let isEmail = this.users.some(item => item.email == User.email)
      let isPassword = this.users.some(item => item.password == User.password)

      if (!isEmail){
        alert('Account does not exist')
      }
      else if (!isPassword){
        alert('Incorrect password')
      }
      else {
        this.us.setUser(User)    
        let user =  this.us.getUser()
        
        if (user.role == "user")
          this.router.navigate(['/'])
        else
          this.router.navigate(['/admin'])
      }
    }
  }

  constructor(private router: Router, private us: UserService){
    us.getUsers().subscribe(data =>{
      this.users = data
    })
  }
}
