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

  constructor(private http: HttpClient, private router: Router) {}

  loginUser() {
    // Send a POST request to your backend to authenticate the user
    this.http
      .post('http://localhost:8086/api/client/login', this.user)
      .subscribe(
        (response: any) => {
          console.log('Login successful:', response);
          // You can handle successful login here, such as storing user data in local storage and navigating to a dashboard
          // For example:
          // localStorage.setItem('currentUser', JSON.stringify(response));
          // this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Login failed:', error);
          // Handle login failure here, show an error message to the user, etc.
        }
      );
  }
}
