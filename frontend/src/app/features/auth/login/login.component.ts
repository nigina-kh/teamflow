import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  email = '';
  password = '';
  error = '';

  login() {

    if (!this.email || !this.password) {
      this.error = 'Email and password are required';
      return;
    }

    this.error = '';

    console.log({
      email: this.email,
      password: this.password
    });

  }

}