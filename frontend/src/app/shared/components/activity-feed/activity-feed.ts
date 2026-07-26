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
      action: 'completed Task Dashboard UI'
    },
    {
      user: 'Sarah',
      action: 'created Project TeamFlow'
    },
    {
      user: 'Michael',
      action: 'commented on Mobile App'
    },
    {
      user: 'Emily',
      action: 'uploaded new design files'
    }
  ];

}