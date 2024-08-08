import { DropdownModule } from 'primeng/dropdown';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-search',
  standalone: true,
  imports: [
    DropdownModule,
    CommonModule,
    FormsModule,
  ],

  templateUrl: './home-search.component.html',
  styleUrl: './home-search.component.scss'
})
export class HomeSearchComponent {
  jobIds: any = [
    { id: 1, name: 'Job Id 1' },
    { id: 2, name: 'Job Id 2' },
    { id: 3, name: 'Job Id 3' },
    { id: 4, name: 'Job Id 4' },
  ];
  jobId: any;
}
