import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isLoggedIn: boolean = false;
  name: string = '';
  pass: string = '';
  wrong: string = '';
  flg:boolean  = false;
  constructor(private authService: AuthService, private router: Router) {}
  login() { 
    this.authService.login(this.name, this.pass).subscribe(
      (response) => {
        console.log('Login successful', response);
        this.wrong = 'invalid credentials';
        this.flg = this.authService.isLoggedIn();
        console.log(this.flg);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}