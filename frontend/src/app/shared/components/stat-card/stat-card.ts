import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss'
})
export class StatCard {

  @Input() label = '';

  @Input() value = '';

  @Input() change = '';

  @Input() color = '#2563EB';

}