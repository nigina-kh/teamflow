import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ProjectsService } from '../../../core/services/projects.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit {

  private readonly projectsService =
    inject(ProjectsService);

  projects = signal<any[]>([]);

  projectName = '';

  projectDescription = '';

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {

    this.projectsService
      .getProjects()
      .subscribe({

        next: projects => {

          this.projects.set(projects);

        },

        error: console.error,

      });

  }

}