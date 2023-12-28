import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  email: string = '';
  password: string = '';

  constructor() {}

  register() {
    const hardcodedEmail = 'houssam';       // Hardcoded email for registration
    const hardcodedPassword = 'houssam';   // Hardcoded password for registration
  
    if (this.email === hardcodedEmail && this.password === hardcodedPassword) {
      // User with the same credentials already exists, show an error message or handle accordingly
      console.log('User with the same credentials already exists.');
    } else {
      // Registration successful, you can add the new user or redirect to another page
      console.log('Registration successful');
    }
  }
  

  navigateToLogin() {
    // Implement navigation to the login page
    console.log('Navigate to login page');
  }
}
