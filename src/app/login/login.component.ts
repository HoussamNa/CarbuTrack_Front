import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor() {}

  login() {
    const hardcodedEmail = 'houssam';
    const hardcodedPassword = 'houssam';
  
    if (this.email === hardcodedEmail && this.password === hardcodedPassword) {
      // Successful login, you can redirect to another page here
      console.log('Login successful');
    } else {
      // Login failed, show an error message or handle accordingly
      console.log('Login failed. Invalid credentials.');
    }
  }
  

  navigateToRegistration() {
    // Implement navigation to the registration page
    console.log('Navigate to registration page');
  }
}
