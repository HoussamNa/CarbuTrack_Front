import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  email: string = '';
  password: string = '';
  username: string = '';
  confirmPassword: string = ''; 

  constructor() {}

  register() {
    
  }
  

  navigateToLogin() {
    // Implement navigation to the login page
    console.log('Navigate to login page');
  }
}
