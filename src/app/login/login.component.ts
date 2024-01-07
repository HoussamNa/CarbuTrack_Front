import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: boolean = false;

  constructor(private router: Router) {}

  login() {
    const Email = 'admin';
    const Password = 'admin';

    if (this.email === Email && this.password === Password) {
      // Successful login, redirect to another page (e.g., home)
      console.log('Login successful');
      this.router.navigate(['/home']); // Assuming 'home' is the route for the home page
    } else {
      // Login failed, set error to true to show error message in the template
      console.log('Login failed. Invalid credentials.');
      this.error = true;
    }
  }

  navigateToRegistration() {
    // Navigate to the registration page
    this.router.navigate(['/register']);
  }
}
// export class LoginComponent {
//   email: string = '';
//   password: string = '';
//   error: boolean = false;

//   private apiUrl = 'http://localhost:8086/api/client';

//   constructor(private router: Router, private http: HttpClient) {}

//   login() {
//     const loginData = { email: this.email, password: this.password };

//     this.http.post<any>(`${this.apiUrl}/login`, loginData).subscribe(
//       (response) => {
//         // Check for response status or token validity from the backend
//         if (response && response.token) {
//           // Successful login, redirect to another page (e.g., home)
//           console.log('Login successful');
//           this.router.navigate(['/home']); // Assuming 'home' is the route for the home page
//         } else {
//           // Login failed, set error to true to show error message in the template
//           console.log('Login failed. Invalid credentials.');
//           this.error = true;
//         }
//       },
//       (error) => {
//         // Handle error cases, show error messages, etc.
//         console.error('Error during login:', error);
//         this.error = true;
//       }
//     );
//   }

//   navigateToRegistration() {
//     // Implement navigation to the registration page
//     console.log('Navigate to registration page');
//   }
// }