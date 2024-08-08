import { Component } from '@angular/core';
import { HomeSearchComponent } from './home-search/home-search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeSearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  dailyJobsStatus: any = [1, 2, 3, 4, 5];
}
