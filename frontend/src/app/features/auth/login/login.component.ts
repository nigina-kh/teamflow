import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth';

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

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {

    if (!this.email || !this.password) {

      this.error = 'Email and password are required';

      return;

    }

    const success = this.auth.login(
      this.email,
      this.password
    );

    if (success) {

      this.router.navigate(['/dashboard']);

      return;

    }

    this.error = 'Invalid credentials';

  }

}