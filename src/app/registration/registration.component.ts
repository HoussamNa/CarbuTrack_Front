import { Component } from '@angular/core';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  user: any = {
    username: '',
    email: '',
    password: '',
    isEntreprise: false,
  };

  constructor(private registrationService: RegistrationService) {}

  registerUser(): void {
    this.registrationService.register(this.user).subscribe(
      (response) => {
        console.log('Registration successful', response);
      },
      (error) => {
        console.error('Registration failed', error);
      }
    );
  }
}
