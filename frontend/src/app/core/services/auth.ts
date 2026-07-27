import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';

import {
  Observable,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly API_URL =
    'http://localhost:3000/auth';

  private readonly TOKEN_KEY =
    'access_token';

  constructor(
    private http: HttpClient,
  ) {}

  login(
    email: string,
    password: string,
    rememberMe: boolean,
  ): Observable<{ access_token: string }> {

    return this.http.post<{ access_token: string }>(
      `${this.API_URL}/login`,
      {
        email,
        password,
      },
    ).pipe(

      tap(response => {

        if (rememberMe) {

          localStorage.setItem(
            this.TOKEN_KEY,
            response.access_token,
          );

          sessionStorage.removeItem(
            this.TOKEN_KEY,
          );

        } else {

          sessionStorage.setItem(
            this.TOKEN_KEY,
            response.access_token,
          );

          localStorage.removeItem(
            this.TOKEN_KEY,
          );

        }

      }),

    );

  }

  logout(): void {

    localStorage.removeItem(
      this.TOKEN_KEY,
    );

    sessionStorage.removeItem(
      this.TOKEN_KEY,
    );

  }

  getToken(): string | null {

    return (
      localStorage.getItem(this.TOKEN_KEY) ??
      sessionStorage.getItem(this.TOKEN_KEY)
    );

  }

  isLoggedIn(): boolean {

    return this.getToken() !== null;

  }

  getCurrentUser(): Observable<any> {

    return this.http.get(
      `${this.API_URL}/me`,
      {
        headers: new HttpHeaders({
          Authorization:
            `Bearer ${this.getToken()}`,
        }),
      },
    );

  }

}