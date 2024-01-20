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

  emailConstraintMessage: string = '';
  passwordConstraintMessage: string = '';

  constructor(private http: HttpClient) {}

  registerUser() {
    // Check email and password constraints
    if (!this.validateEmail(this.user.email)) {
      this.emailConstraintMessage = 'Invalid email format.';
      return;
    } else {
      this.emailConstraintMessage = ''; // Clear email error message
    }
  
    if (!this.validatePassword(this.user.password)) {
      this.passwordConstraintMessage = 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.';
      return;
    } else {
      this.passwordConstraintMessage = ''; // Clear password error message
    }
  
    // Proceed with registration
    this.http
      .post('http://localhost:8086/api/client/', this.user)
      .subscribe(
        (response) => {
          console.log('Registration successful:', response);
          // Clear the fields after successful registration
          this.user.username = '';
          this.user.email = '';
          this.user.password = '';
          this.user.isEntreprise = false;
        },
        (error) => {
          console.error('Registration failed:', error);
        }
      );
  }
  

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
    return passwordRegex.test(password);
  }
}
