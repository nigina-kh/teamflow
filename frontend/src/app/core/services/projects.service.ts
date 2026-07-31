import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  switchMap,
  of,
} from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {

  private readonly http =
    inject(HttpClient);

  private readonly api =
    environment.apiUrl;

  getProjects() {

    return this.http
      .get<any[]>(`${this.api}/workspaces`)
      .pipe(

        switchMap(workspaces => {

          console.log('Workspaces:', workspaces);

          if (workspaces.length === 0) {

            console.warn('No workspaces found.');

            return of([]);

          }

          console.log(
            'Loading projects from workspace:',
            workspaces[0].id,
          );

          return this.http.get<any[]>(

            `${this.api}/projects?workspaceId=${workspaces[0].id}`,

          );

        }),

      );

  }

  createProject(
    name: string,
    description: string,
  ) {

    return this.http
      .get<any[]>(`${this.api}/workspaces`)
      .pipe(

        switchMap(workspaces => {

          console.log('Workspaces:', workspaces);

          if (workspaces.length === 0) {

            console.warn('No workspaces found.');

            return of(null);

          }

          console.log(
            'Creating project in workspace:',
            workspaces[0].id,
          );

          console.log({
            name,
            description,
            workspaceId: workspaces[0].id,
          });

          return this.http.post(

            `${this.api}/projects`,

            {
              name,
              description,
              workspaceId: workspaces[0].id,
            },

          );

        }),

      );

  }

}