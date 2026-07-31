import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { switchMap, of } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {

  private readonly http = inject(HttpClient);

  private readonly api = environment.apiUrl;

  getProjects() {

    return this.http
      .get<any[]>(`${this.api}/workspaces`)
      .pipe(

        switchMap(workspaces => {

          if (workspaces.length === 0) {
            return of([]);
          }

          return this.http.get<any[]>(

            `${this.api}/projects?workspaceId=${workspaces[0].id}`,

          );

        }),

      );

  }

}