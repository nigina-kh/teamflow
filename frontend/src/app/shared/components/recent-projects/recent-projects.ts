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
      name: 'TeamFlow Website',
      status: 'In Progress'
    },
    {
      name: 'Cinema Booking',
      status: 'Review'
    },
    {
      name: 'Inventory System',
      status: 'Completed'
    }
  ];

}