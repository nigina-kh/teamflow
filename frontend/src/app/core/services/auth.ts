import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'token';

  login(email: string, password: string): boolean {

    if (!email.trim() || !password.trim()) {
      return false;
    }

    localStorage.setItem(this.TOKEN_KEY, 'demo-token');

    return true;

  }

  logout(): void {

    localStorage.removeItem(this.TOKEN_KEY);

  }

  isLoggedIn(): boolean {

    return localStorage.getItem(this.TOKEN_KEY) !== null;

  }

}