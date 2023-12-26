// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        if (response && response.success) {
          // Authentication successful, navigate to the desired page
          this.router.navigate(['/home',this.username]);
        } else {
          console.error('Authentication failed:', response.message);
          // Handle authentication failure (show error message, etc.)
        }
      },
      (error) => {
        console.error('Error during login:', error);
        // Handle HTTP error (show error message, etc.)
      }
    );
  }
}
