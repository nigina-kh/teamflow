import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss'
})
export class NotFound {

  isLoggedIn = !!localStorage.getItem('token');

  constructor(private router: Router) {}

  goHome() {

    if (this.isLoggedIn) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }

  }

}