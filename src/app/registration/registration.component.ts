// registration.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  user = {
    username: '',
    email: '',
    password: '',
    isEntreprise: false,
  };

  constructor(private http: HttpClient) {}

  registerUser() {
    // Make an HTTP POST request to your backend for registration
    this.http
      .post('http://localhost:8086/api/client/', this.user) // Replace with your actual backend URL
      .subscribe(
        (response) => {
          // Handle a successful registration response
          console.log('Registration successful:', response);
          // You can also navigate to a different page after successful registration.
        },
        (error) => {
          // Handle registration error
          console.error('Registration failed:', error);
        }
      );
  }
}
