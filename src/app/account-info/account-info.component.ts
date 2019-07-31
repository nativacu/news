import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.auth.signOut();
    this.router.navigateByUrl('/login-page');
  }

}
