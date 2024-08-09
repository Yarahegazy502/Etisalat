import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-activities-skeleton',
  standalone: true,
  imports: [SkeletonModule, CommonModule],
  templateUrl: './activities-skeleton.component.html',
  styleUrl: './activities-skeleton.component.scss'
})
export class ActivitiesSkeletonComponent {
  @Input() type: any;

}
