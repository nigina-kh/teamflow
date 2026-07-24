import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environment';

import { LoginRequest } from '../models/auth/login-request';
import { RegisterRequest } from '../models/auth/register-request';
import { AuthResponse } from '../models/auth/auth-response';
import { User } from '../models/auth/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly api =
    environment.apiUrl;

  login(
    data: LoginRequest,
  ): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `${this.api}/auth/login`,
        data,
      )
      .pipe(
        tap((response) => {
          localStorage.setItem(
            'access_token',
            response.access_token,
          );
        }),
      );
  }

  register(
    data: RegisterRequest,
  ): Observable<void> {
    return this.http.post<void>(
      `${this.api}/auth/register`,
      data,
    );
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(
      `${this.api}/auth/me`,
    );
  }

  logout(): void {
    localStorage.removeItem(
      'access_token',
    );
  }

  getToken(): string | null {
    return localStorage.getItem(
      'access_token',
    );
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}