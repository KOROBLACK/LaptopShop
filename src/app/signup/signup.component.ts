import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  users: any[] = [];

  formSignup = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', Validators.required),
  });

  signUp() {
    if (this.formSignup.dirty && this.formSignup.valid) {
      const newUser = {
        username: this.formSignup.get('username')?.value?.toLowerCase(),
        email: this.formSignup.get('email')?.value?.toLowerCase(),
        password: this.formSignup.get('password')?.value,
        create_at: this.getCreatAt()
      };

      let isUserName = this.users.some(
        (item) => item.username == newUser.username
      );
      let isEmail = this.users.some((item) => item.email == newUser.email);

      if (isUserName) {
        alert('Username is already taken');
      } else if (isEmail) {
        alert('Email is already taken');
      } else {
        this.users.push(newUser);
        this.us.addUsers(newUser).subscribe((res) => {
          this.ngOnInit();
        });

        alert('Signup success');
        this.router.navigate(['/signin']);
      }
    }
  }

  ngOnInit(): void {
    this.us.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  getCreatAt(){
    var thoiGianHienTai = new Date();
    var ngay = thoiGianHienTai.getDate();
    var thang = thoiGianHienTai.getMonth() + 1;
    var nam = thoiGianHienTai.getFullYear();
    var gio = thoiGianHienTai.getHours();
    var phut = thoiGianHienTai.getMinutes();
    var giay = thoiGianHienTai.getSeconds();

    var timeNow = ngay + "/" + thang + "/" + nam + " " + gio + ":" + phut + ":" + giay;
    return timeNow
  }

  constructor(private router: Router, private us: UserService) {
  }
}
