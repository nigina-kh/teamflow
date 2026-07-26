import { Injectable, signal } from '@angular/core';

export interface Project {
  id: number;
  name: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  projects = signal<Project[]>([
    {
      id: 1,
      name: 'Digital Cinema',
      status: 'In Progress'
    },
    {
      id: 2,
      name: 'TeamFlow Website',
      status: 'Review'
    },
    {
      id: 3,
      name: 'Backend API',
      status: 'Completed'
    },
    {
      id: 4,
      name: 'Mobile App',
      status: 'Planning'
    }
  ]);

}