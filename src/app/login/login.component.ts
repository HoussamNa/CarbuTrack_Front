import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user = {
    email: '',
    password: '',
  };

  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  loginUser() {
    this.errorMessage = '';

    this.http
      .post('http://localhost:8086/api/client/login', this.user)
      .subscribe(
        (response: any) => {
          console.log('Login successful:', response);
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid email or password. Please try again.';
        }
      );
  }
}
