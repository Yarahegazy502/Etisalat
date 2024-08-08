import { UserInfo } from './../../../../interfaces/public';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {
  currentLoginInformation: UserInfo = {
    photo: '',
    full_name: 'yara ibrahim'
  };
  summaryName: string = '';

  ngOnInit(): void {
    const fName = this.currentLoginInformation?.full_name.split(" ");
    this.summaryName = fName[0].charAt(0) + fName[1].charAt(0);
  }

  logOut(): void { }
}
