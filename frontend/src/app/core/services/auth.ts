import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(email: string, password: string): boolean {

    if (!email || !password) {
      return false;
    }

    localStorage.setItem('token', 'demo-token');

    return true;

  }

  logout(): void {

    localStorage.removeItem('token');

  }

  isLoggedIn(): boolean {

    return !!localStorage.getItem('token');

  }

}