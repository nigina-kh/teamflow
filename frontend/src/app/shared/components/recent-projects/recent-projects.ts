import { Component, inject } from '@angular/core';
import { ProjectsService } from '../../../core/services/projects.service';

@Component({
  selector: 'app-recent-projects',
  standalone: true,
  imports: [],
  templateUrl: './recent-projects.html',
  styleUrl: './recent-projects.scss'
})
export class RecentProjects {

  projectsService = inject(ProjectsService);

}