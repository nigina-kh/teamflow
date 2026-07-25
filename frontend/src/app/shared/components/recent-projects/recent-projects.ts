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
      name: 'Website Redesign',
      progress: 82
    },

    {
      name: 'Mobile App',
      progress: 61
    },

    {
      name: 'Marketing Campaign',
      progress: 38
    }

  ];

}