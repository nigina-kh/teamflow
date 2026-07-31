import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ProjectsService } from '../../../core/services/projects.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit {

  private readonly projectsService =
    inject(ProjectsService);

  private readonly fb =
    inject(FormBuilder);

  loading = false;

  projects = signal<any[]>([]);

  form = this.fb.group({

    name: [
      '',
      Validators.required,
    ],

    description: [''],

  });

  ngOnInit(): void {

    this.loadProjects();

  }

  loadProjects(): void {

    this.projectsService
      .getProjects()
      .subscribe({

        next: projects => {

          this.projects.set(projects);

        },

        error: console.error,

      });

  }

  createProject(): void {

    if (
      this.loading ||
      this.form.invalid
    ) {
      return;
    }

    this.loading = true;

    this.projectsService
      .createProject(
        this.form.value.name!,
        this.form.value.description ?? '',
      )
      .subscribe({

        next: () => {

          this.loading = false;

          this.form.reset();

          this.loadProjects();

        },

        error: err => {

          this.loading = false;

          console.error(err);

        },

      });

  }

}