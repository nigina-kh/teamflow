import { Component } from '@angular/core';

@Component({
  selector: 'app-activity-feed',
  standalone: true,
  imports: [],
  templateUrl: './activity-feed.html',
  styleUrl: './activity-feed.scss'
})
export class ActivityFeed {

  activities = [
    {
      user: 'Alex',
      action: 'created a new project',
      time: '5 min ago'
    },
    {
      user: 'Sarah',
      action: 'completed a task',
      time: '28 min ago'
    },
    {
      user: 'Daniel',
      action: 'invited a new member',
      time: '1 hour ago'
    },
    {
      user: 'Emma',
      action: 'updated project settings',
      time: 'Yesterday'
    }
  ];

}