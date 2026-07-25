import { Component } from '@angular/core';

import { StatCard } from '../../../shared/components/stat-card/stat-card';
import { RecentProjects } from '../../../shared/components/recent-projects/recent-projects';
import { RecentTasks } from '../../../shared/components/recent-tasks/recent-tasks';
import { ActivityFeed } from '../../../shared/components/activity-feed/activity-feed';

@Component({

  selector: 'app-dashboard',

  standalone: true,

  imports: [

    StatCard,
    RecentProjects,
    RecentTasks,
    ActivityFeed

  ],

  templateUrl: './dashboard.html',

  styleUrl: './dashboard.scss'

})

export class Dashboard {

}