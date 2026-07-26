import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  stats = signal([
    {
      label: 'Active Projects',
      value: '12',
      change: '+8%',
      color: '#2563EB'
    },
    {
      label: 'Completed Tasks',
      value: '124',
      change: '+16%',
      color: '#22C55E'
    },
    {
      label: 'Team Members',
      value: '8',
      change: '+2',
      color: '#A855F7'
    },
    {
      label: 'Deadlines',
      value: '5',
      change: '-1',
      color: '#F97316'
    }
  ]);

}