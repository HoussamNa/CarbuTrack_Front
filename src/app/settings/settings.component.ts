import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  userData = {
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  private apiUrl = 'http://localhost:8086/api/client';

  constructor(private http: HttpClient) {}

  updateSettings() {
    const clientId = 10; // Replace this with the appropriate client ID
    const updatedUserData = {
      username: this.userData.username,
      email: this.userData.email,
      currentPassword: this.userData.currentPassword,
      newPassword: this.userData.newPassword,
      confirmPassword: this.userData.confirmPassword
    };

    const updateUrl = `${this.apiUrl}/${clientId}`; // Construct the update URL with the client ID

    // Perform the API request to update user settings
    this.http.put(updateUrl, updatedUserData).subscribe(
      (response) => {
        this.showSuccessPopup();
        this.clearForm();
      },
      (error) => {
        // Handle error cases, show error messages, etc.
        console.error('Error updating settings:', error);
      }
    );
  }

  showSuccessPopup() {
    alert('Successfully updated!');
  }

  clearForm() {
    this.userData = {
      username: '',
      email: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  }
}
