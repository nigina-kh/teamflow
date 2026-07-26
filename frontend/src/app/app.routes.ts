import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';

import { DashboardLayout } from './layout/dashboard-layout/dashboard-layout';

import { Dashboard } from './features/dashboard/dashboard/dashboard';
import { Projects } from './features/projects/projects/projects';
import { Tasks } from './features/tasks/tasks/tasks';
import { Team } from './features/team/team/team';
import { Settings } from './features/settings/settings/settings';
import { NotFound } from './features/not-found/not-found';
import { authGuard } from './core/guards/auth.guard';

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
    canActivate: [authGuard],

    children: [

      {
        path: 'dashboard',
        component: Dashboard
      },

      {
        path: 'projects',
        component: Projects
      },

      {
        path: 'tasks',
        component: Tasks
      },

      {
        path: 'team',
        component: Team
      },

      {
        path: 'settings',
        component: Settings
      }

    ]

  },

  {
    path: '**',
    component: NotFound
  }

];