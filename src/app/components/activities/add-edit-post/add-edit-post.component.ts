import { ActivitiesService } from './../../../services/activities.service';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, finalize, Subscription, tap } from 'rxjs';
import { AlertsService } from '../../../services/generic/alerts.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PublicService } from '../../../services/generic/public.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-post',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-post.component.html',
  styleUrl: './add-edit-post.component.scss'
})
export class AddEditPostComponent {
  private subscriptions: Subscription[] = [];

  isEdit: boolean = false;
  postId!: number;
  postData: any;

  postForm = this.fb?.group(
    {
      title: ['', {
        validators: [
          Validators.required,
          Validators?.minLength(3)], updateOn: "blur"
      }],
      description: ['', {
        validators: [
          Validators.required], updateOn: "blur"
      }],
    }
  );
  get formControls(): any {
    return this.postForm?.controls;
  }

  constructor(
    private activitiesService: ActivitiesService,
    private alertsService: AlertsService,
    public publicService: PublicService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.postData = this.config.data;

    if (this.postData.type == 'edit') {
      this.isEdit = true;
      this.postId = this.postData?.item?.id;
      this.patchValue();
    }
  }

  patchValue(): void {
    this.postForm.patchValue({
      title: this.postData?.item?.title,
      description: this.postData?.item?.body,
    });
  }


  // Start Add/Edit Post
  submit(): void {
    if (this.postForm?.valid) {
      const formData: any = this.extractFormData();
      this.addEditBank(formData);
    } else {
      this.publicService?.validateAllFormFields(this.postForm);
    }
  }
  private extractFormData(): any {
    let data = {
      title: this.postForm?.value?.title,
      description: this.postForm?.value?.description,
    };

    return data;
  }
  private addEditBank(formData: any): void {
    this.publicService?.showGlobalLoader?.next(true);
    let subscribeAddEditPost: Subscription = this.activitiesService?.addEditPost(formData, this.postId ? this.postId : null).pipe(
      tap(res => this.handleAddEditPostSuccess(res)),
      catchError(err => this.handleError(err)),
      finalize(() => this.finalizeAddEditPost())
    ).subscribe();
    this.subscriptions.push(subscribeAddEditPost);
  }
  private handleAddEditPostSuccess(response: any): void {
    this.publicService?.showGlobalLoader?.next(false);
    if (response) {
      this.ref.close({ listChanged: true, item: response?.data });
      this.handleSuccess(response?.message);
    } else {
      this.handleError(response?.message);
    }
  }
  private finalizeAddEditPost(): void {
    this.publicService.showGlobalLoader.next(false);
  }
  // End Add/Edit Bank

  cancel(): void {
    this.ref?.close({ listChanged: false });
  }

  /* --- Handle api requests messages --- */
  private handleSuccess(msg: string | null): any {
    this.setMessage('Success', 'success');
  }
  private handleError(err: string | null): any {
    this.setMessage(err || 'An Error Occur', 'error');
  }
  private setMessage(message: string, type?: string | null): void {
    console.log(message);

    this.alertsService.openToast(type, type, message);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && !subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
