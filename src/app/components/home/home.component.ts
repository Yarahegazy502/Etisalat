import { ActivitieCardComponent } from './activitie-card/activitie-card.component';
import { HomeSkeletonComponent } from './home-skeleton/home-skeleton.component';
import { HomeSearchComponent } from './home-search/home-search.component';
import { AlertsService } from '../../services/generic/alerts.service';
import { catchError, finalize, Subscription, tap } from 'rxjs';
import { HomeService } from '../../services/home.service';
import { Activities } from '../../interfaces/home';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { Component } from '@angular/core';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DropdownModule,
    CommonModule,
    ChartModule,
    FormsModule,

    ActivitieCardComponent,
    HomeSkeletonComponent,
    HomeSearchComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private subscriptions: Subscription[] = [];
  isLoadingHomeData: boolean = false;
  homeData: any;

  dailyJobsStatus: any = [1, 2, 3, 4, 5];
  statusTypes: any = [
    { id: 1, name: 'Weekly' },
    { id: 2, name: 'Monthly' },
    { id: 3, name: 'Yearly' },
  ];
  statusType: any = this.statusTypes[1];

  activities: Activities[] = [];

  dataChartItems: any = [];
  data: any;
  chartOptions: any;

  constructor(
    private alertsService: AlertsService,
    private homeService: HomeService,
  ) { }

  ngOnInit(): void {
    this.getHomeData();

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        }
      }
    }
  }

  getHomeData(): void {
    this.isLoadingHomeData = true;
    let homeDataSubscription = this.homeService?.getHomeData()?.pipe(
      tap((res: any) => {
        if (res) {
          this.homeData = res.data;
          this.handleSuccessHomeData();
        } else {
          this.handleError(res?.message);
        }
      }),
      catchError(err => this.handleError(err)),
      finalize(() => this.isLoadingHomeData = false)
    ).subscribe();

    this.subscriptions.push(homeDataSubscription);
  }
  handleSuccessHomeData(): void {
    this.dataChartItems = [6, 4, 2, 1];
    this.getChartData();

    this.activities = [
      { id: 1, count: 1200, total: 100, actionType: new Date() },
      { id: 2, count: 1432, total: 1200, actionType: new Date() },
      { id: 3, count: 1765, total: 3200, actionType: new Date() },
      { id: 4, count: 6543, total: 980, actionType: new Date() },
    ];
  }
  handleError(err: any): any {
    this.alertsService?.openToast('error', err || 'An error occurred');
  }

  getChartData(): void {
    this.data = {
      labels: ['Total Job', 'In Progress', 'Success', 'Failed'],
      datasets: [
        {
          data: this.dataChartItems,
          backgroundColor: [
            "#e4e4e4",
            "#005ba4",
            "#51934a",
            '#de6b2a'
          ],
          hoverBackgroundColor: [
            "#e4e4e4",
            "#005ba4",
            "#51934a",
            '#de6b2a'
          ]
        }
      ]
    };
  }
  getBackgroundColor(index: number): string {
    return this.data.datasets[0].backgroundColor[index];
  }

  changeStatusType(): void {
    console.log(this.statusType);
    if (this.statusType?.id == 1) {
      this.dataChartItems = [6, 1, 1, 4];
    }
    if (this.statusType?.id == 2) {
      this.dataChartItems = [6, 4, 2, 1];
    }
    if (this.statusType?.id == 3) {
      this.dataChartItems = [6, 3, 2, 2];
    }
    this.getChartData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
