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
      text: 'Emma created Project Alpha',
      time: '5 min ago'
    },
    {
      text: 'Liam completed Task #24',
      time: '20 min ago'
    },
    {
      text: 'Sophia invited a new member',
      time: '1 hour ago'
    },
    {
      text: 'System backup completed',
      time: '3 hours ago'
    }
  ];

}