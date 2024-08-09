import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Activities } from '../../../interfaces/home';
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
  @Output() detailsHandler = new EventEmitter();

  details(): void {
    this.detailsHandler.emit();
  }
}
