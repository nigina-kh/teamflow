import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

export interface DashboardResponse {
  stats: {
    activeProjects: number;
    completedTasks: number;
    teamMembers: number;
    deadlines: number;
  };

  projects: any[];

  tasks: any[];
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  private readonly http = inject(HttpClient);

  private readonly api = environment.apiUrl;

  getDashboard(): Observable<DashboardResponse> {

    return this.http.get<DashboardResponse>(
      `${this.api}/dashboard`,
    );

  }

}