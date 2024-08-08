import { Activities } from '../../../interfaces/home';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activitie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activitie-card.component.html',
  styleUrl: './activitie-card.component.scss'
})
export class ActivitieCardComponent {
  @Input() item!: Activities;
}
