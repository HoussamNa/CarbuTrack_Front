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
    this.http
      .post('http://localhost:8086/api/client/', this.user)
      .subscribe(
        (response) => {
          console.log('Registration successful:', response);
        },
        (error) => {
          console.error('Registration failed:', error);
        }
      );
  }
}
