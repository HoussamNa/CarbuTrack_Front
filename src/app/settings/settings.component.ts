import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  userData = {
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser !== null) {
      const userData = JSON.parse(currentUser);
      this.userData.username = userData.username;
      this.userData.email = userData.email;
    }
  }

  updateSettings() {
    this.errorMessage = '';
    this.successMessage = '';

    // Check if newPassword and confirmPassword match
    if (this.userData.newPassword !== this.userData.confirmPassword) {
      this.errorMessage = 'New password and confirm password do not match.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 5000);
      return; // Return early if passwords don't match
    }

    this.http
      .put('http://localhost:8086/api/client/updatePassword', {
        email: this.userData.email,
        currentPassword: this.userData.currentPassword,
        newPassword: this.userData.newPassword,
      }, { responseType: 'text' })
      .subscribe(
        () => {
          this.successMessage = 'Password updated successfully';
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        },
        (error) => {
          console.error('Password update failed:', error);
          this.errorMessage = 'Failed to update password. Please check your current password and try again.';
          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);
        }
      );
  }
}
