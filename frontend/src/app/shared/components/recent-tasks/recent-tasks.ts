import { Component } from '@angular/core';

@Component({
  selector: 'app-recent-tasks',
  standalone: true,
  imports: [],
  templateUrl: './recent-tasks.html',
  styleUrl: './recent-tasks.scss'
})
export class RecentTasks {

  tasks = [
    {
      title: 'Design Login Screen',
      status: 'Done'
    },
    {
      title: 'Implement Dashboard',
      status: 'In Progress'
    },
    {
      title: 'Create REST API',
      status: 'Pending'
    },
    {
      title: 'Write Documentation',
      status: 'Pending'
    }
  ];

}