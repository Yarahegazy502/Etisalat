// Modules
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'error404',
  standalone: true,
  imports: [
    // Modules
    CommonModule,
    RouterModule,
  ],
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component {

  constructor() { }

  ngOnInit(): void {
  }
}
