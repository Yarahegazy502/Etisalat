import { ActivitieCardComponent } from './activitie-card/activitie-card.component';
import { HomeSearchComponent } from './home-search/home-search.component';
import { DropdownModule } from 'primeng/dropdown';
import { Activities } from '../../interfaces/home';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,

    HomeSearchComponent,
    ActivitieCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  dailyJobsStatus: any = [1, 2, 3, 4, 5];
  statusTypes: any = [
    { id: 1, name: 'Weekly' },
    { id: 2, name: 'Monthly' },
    { id: 3, name: 'Yearly' },
  ];
  statusType: any = this.statusTypes[1];

  activities: Activities[] = [
    { id: 1, count: 1200, total: 100, actionType: new Date() },
    { id: 2, count: 1432, total: 1200, actionType: new Date() },
    { id: 3, count: 1765, total: 3200, actionType: new Date() },
    { id: 4, count: 6543, total: 980, actionType: new Date() },
  ]
}
