import { ActivitiesSkeletonComponent } from './activities-skeleton/activities-skeleton.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { AddEditPostComponent } from './add-edit-post/add-edit-post.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { AlertsService } from './../../services/generic/alerts.service';
import { ActivitiesService } from './../../services/activities.service';
import { PublicService } from '../../services/generic/public.service';
import { catchError, finalize, Subscription, tap } from 'rxjs';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmationService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { Post } from '../../interfaces/post';
import { Component } from '@angular/core';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [ButtonComponent, CommonModule, ActivitiesSkeletonComponent, PaginatorModule, ConfirmDialogModule],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss',
  providers: [DialogService, ConfirmationService]
})
export class ActivitiesComponent {
  private subscriptions: Subscription[] = [];
  isLoadingPosts: boolean = false;
  posts: Post[] = [];
  currentPage: any = 1;
  paginatedPostsList: any = [];

  constructor(
    private confirmationService: ConfirmationService,
    private activitiesService: ActivitiesService,
    private alertsService: AlertsService,
    private dialogService: DialogService,
    private publicService: PublicService
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

  postDetails(item: any): void {
    const ref = this.dialogService?.open(PostDetailsComponent, {
      data: item,
      header: 'Post Details',
      dismissableMask: true,
      width: '50%',
      styleClass: 'custom-modal',
    });
  }

  //Start Delete Post Functions
  deletePost(item: any): void {
    this.confirmationService?.confirm({
      message: 'Are you sure you want to delete this post',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteItem(item);
      }
    });
  }
  deleteItem(item: any): void {
    this.publicService.showGlobalLoader.next(true);
    let deletePostSubscription: Subscription = this.activitiesService?.deletePostById(item?.id)?.pipe(
      tap((res: any) => this.processDeleteResponse(res)),
      catchError(err => this.handleError(err)),
      finalize(() => {
        this.publicService.showGlobalLoader.next(false);
      })
    ).subscribe();
    this.subscriptions.push(deletePostSubscription);
  }
  private processDeleteResponse(res: any): void {
    if (res) {
      this.alertsService.openToast('success', 'success', 'success');
      this.getPosts();
    } else {
      this.handleError(res.message);
    }
  }
  //End Delete Post Functions


  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
