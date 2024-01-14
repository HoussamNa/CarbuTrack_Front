import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

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

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser !== null) {
        const userData = JSON.parse(currentUser);
        this.userData.username = userData.username;
        this.userData.email = userData.email;
      }
    }
  }

  updateSettings() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.userData.newPassword !== this.userData.confirmPassword) {
      this.errorMessage = 'New password and confirm password do not match.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 5000);
      return;
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
            this.clearFields(); // Clear password-related fields on success
          }, 5000);
        },
        (error) => {
          console.error('Password update failed:', error);

          if (error.status === 400) {
            this.errorMessage = error.error;
          } else {
            this.errorMessage = 'Failed to update password. Please try again later.';
          }

          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);
        }
      );
  }

  clearFields() {
    this.userData.currentPassword = '';
    this.userData.newPassword = '';
    this.userData.confirmPassword = '';
  }
}
