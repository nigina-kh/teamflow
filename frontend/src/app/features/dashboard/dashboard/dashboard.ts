import { Component, OnInit, inject, signal } from '@angular/core';

import { StatCard } from '../../../shared/components/stat-card/stat-card';

import { DashboardService } from '../../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    StatCard,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {

  private readonly dashboardService = inject(DashboardService);

  stats = signal<any[]>([]);

  projects = signal<any[]>([]);

  tasks = signal<any[]>([]);

  ngOnInit(): void {

    this.dashboardService.getDashboard().subscribe({

      next: (data) => {

        this.stats.set([
          {
            label: 'Active Projects',
            value: data.stats.activeProjects,
            change: '',
            color: '#2563EB',
          },
          {
            label: 'Completed Tasks',
            value: data.stats.completedTasks,
            change: '',
            color: '#22C55E',
          },
          {
            label: 'Team Members',
            value: data.stats.teamMembers,
            change: '',
            color: '#A855F7',
          },
          {
            label: 'Deadlines',
            value: data.stats.deadlines,
            change: '',
            color: '#F97316',
          },
        ]);

        this.projects.set(data.projects);

        this.tasks.set(data.tasks);

      },

      error: (err) => {
        console.error('Failed to load dashboard:', err);
      },

    });

  }

}