import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';

import { DashboardLayout } from './layout/dashboard-layout/dashboard-layout';
import { Dashboard } from './features/dashboard/dashboard/dashboard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: '',
    component: DashboardLayout,

    children: [

      {
        path: 'dashboard',
        component: Dashboard
      }

    ]

  },

  {
    path: '**',
    redirectTo: 'login'
  }

];