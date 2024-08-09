import { AlertsService } from './../../services/generic/alerts.service';
import { ActivitiesService } from './../../services/activities.service';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { catchError, finalize, Subscription, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivitiesSkeletonComponent } from './activities-skeleton/activities-skeleton.component';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [ButtonComponent, CommonModule, ActivitiesSkeletonComponent],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent {
  private subscriptions: Subscription[] = [];
  isLoadingPosts: boolean = false;
  posts: any = [];

  constructor(
    private activitiesService: ActivitiesService,
    private alertsService: AlertsService
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.isLoadingPosts = true;
    let postsSubscription = this.activitiesService?.getPosts()?.pipe(
      tap((res: any) => {
        if (res) {
          this.posts = res;
        } else {
          this.handleError(res?.message);
        }
      }),
      catchError(err => this.handleError(err)),
      finalize(() => this.isLoadingPosts = false)
    ).subscribe();

    this.subscriptions.push(postsSubscription);
  }

  handleError(err: any): any {
    this.alertsService?.openToast('error', err || 'An error occurred');
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
