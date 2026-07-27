import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  hidePassword = true;

  loading = false;

  error = '';

  emailSuggestions: string[] = [];

  private readonly domains = [
    'gmail.com',
    'googlemail.com',
    'outlook.com',
    'hotmail.com',
    'live.com',
    'icloud.com',
    'me.com',
    'yahoo.com',
    'proton.me',
    'protonmail.com',
    'yandex.com',
    'mail.ru',
    'gmx.com',
    'zoho.com',
  ];

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {

    this.loginForm = this.fb.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email,
        ],
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._#-]).+$/,
          ),
        ],
      ],

      rememberMe: [false],

    });

  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe');
  }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  updateSuggestions(): void {

    const value = (this.email?.value ?? '').trim();

    this.emailSuggestions = [];

    if (!value) {
      return;
    }

    if (value.includes('@')) {

      const [username, typedDomain = ''] = value.split('@');

      if (!username) {
        return;
      }

      this.emailSuggestions = this.domains
        .filter(domain =>
          domain.startsWith(typedDomain.toLowerCase()),
        )
        .map(domain => `${username}@${domain}`)
        .slice(0, 6);

      return;
    }

    this.emailSuggestions = this.domains
      .map(domain => `${value}@${domain}`)
      .slice(0, 6);

  }

  selectSuggestion(email: string): void {

    this.email?.setValue(email);

    this.emailSuggestions = [];

  }

  login(): void {

    if (this.loading) {
      return;
    }

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }

    this.loading = true;

    this.error = '';

    this.emailSuggestions = [];

    this.auth.login(
      this.email!.value.trim(),
      this.password!.value,
      this.rememberMe!.value,
    ).subscribe({

      next: () => {

        this.loading = false;

        this.router.navigate(['/dashboard']);

      },

      error: (err: any) => {

        this.loading = false;

        this.error =
          err?.error?.message ??
          'Invalid email or password.';

      },

    });

  }

}