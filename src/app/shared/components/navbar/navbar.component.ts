import { NavbarLinks } from '../../../interfaces/public';
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

// Components
import { UserInfoComponent } from './user-info/user-info.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterModule,

    // Components
    UserInfoComponent,
    ButtonComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  navAllLinks: NavbarLinks[] = [];
  isUserLoggedIn: boolean = false;

  constructor() {
    this.isUserLoggedIn = true;
    this.navAllLinks = [
      { id: 1, name: 'Home', route: '/Home' },
      { id: 2, name: 'My Activities', route: '/My-Activities' },
      { id: 3, name: 'SPOCs', route: '/Spocs' },
    ];
  }

  login(): void { }
}
