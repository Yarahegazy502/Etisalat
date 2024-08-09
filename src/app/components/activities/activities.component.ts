import { AlertsService } from './../../services/generic/alerts.service';
import { ActivitiesService } from './../../services/activities.service';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { catchError, finalize, Subscription, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivitiesSkeletonComponent } from './activities-skeleton/activities-skeleton.component';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { AddEditPostComponent } from './add-edit-post/add-edit-post.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [ButtonComponent, CommonModule, ActivitiesSkeletonComponent, PaginatorModule],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss',
  providers: [DialogService]
})
export class ActivitiesComponent {
  private subscriptions: Subscription[] = [];
  isLoadingPosts: boolean = false;
  posts: any = [];
  currentPage: any = 1;
  paginatedPostsList: any = [];

  constructor(
    private activitiesService: ActivitiesService,
    private alertsService: AlertsService,
    private dialogService: DialogService
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
          this.getPaginatedPosts();
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

  onPageChangePosts(event: any) {
    this.currentPage = event.page + 1;
    this.getPaginatedPosts();
  }
  getPaginatedPosts(): any {
    const startIndex = (this.currentPage - 1) * 6;
    const endIndex = startIndex + 6;
    this.paginatedPostsList = this.posts.slice(startIndex, endIndex);
  }

  addEditPost(type?: any, item?: any): void {
    const ref = this.dialogService?.open(AddEditPostComponent, {
      data: {
        item,
        type: type == 'edit' ? 'edit' : 'add',
      },
      header: type == 'edit' ? 'Edit Post' : 'Add Post',
      dismissableMask: false,
      width: '40%',
      styleClass: 'custom-modal',
    });
    ref.onClose.subscribe((res: any) => {
      if (res?.listChanged) {
        this.getPosts();
      }
      this.currentPage = 1;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
