import { Component } from '@angular/core';

@Component({
  selector: 'app-recent-projects',
  standalone: true,
  imports: [],
  templateUrl: './recent-projects.html',
  styleUrl: './recent-projects.scss'
})
export class RecentProjects {

  projects = [

    {
      name: 'Digital Cinema',
      status: 'In Progress'
    },

    {
      name: 'TeamFlow Website',
      status: 'Review'
    },

    {
      name: 'Backend API',
      status: 'Completed'
    },

    {
      name: 'Mobile App',
      status: 'Planning'
    }

  ];

}