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
      title: 'Design Dashboard UI',
      priority: 'High',
      due: 'Today'
    },
    {
      title: 'Fix Login Validation',
      priority: 'Medium',
      due: 'Tomorrow'
    },
    {
      title: 'Update Documentation',
      priority: 'Low',
      due: 'Jul 28'
    }
  ];

}