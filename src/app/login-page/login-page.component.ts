import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmitLogin(email: string, password: string) {
    this.auth.loginMail(email, password).then(() => {
      this.router.navigateByUrl('/home-page');
    }).catch((err) => {
      window.alert(err);
    });
  }

  onSubmitRegister(email: string, password: string, fName: string, lName: string) {
    const data: any = {
      email,
      firstName: fName,
      lastName: lName,
      subscriptions: [],
    };
    this.auth.emailRegister(email, password, data).then(() => {
        this.router.navigateByUrl('/home-page');
        console.log(email, password, data);
    }).catch((err) => {
      window.alert(err);
    });
  }
}
