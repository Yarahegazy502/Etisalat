import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Post } from '../../../interfaces/post';
import { Component } from '@angular/core';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent {
  postData!: Post;

  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
  ) { }

  ngOnInit(): void {
    this.postData = this.config.data;
    console.log(this.postData);

  }

  cancel(): void {
    this.ref?.close({ listChanged: false });
  }
}
