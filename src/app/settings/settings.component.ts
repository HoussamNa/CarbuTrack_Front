import { Component } from '@angular/core';

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

  updateSettings() {
    // Perform your update logic here, e.g., making an API request to update the user's settings
    // Once the update is successful, display a pop-up message and clear the form
    this.showSuccessPopup();
    this.clearForm();
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
