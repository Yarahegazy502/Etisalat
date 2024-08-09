
import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router';
import { NavbarLinks } from '../../../interfaces/public';
import { ButtonComponent } from '../button/button.component';
import { UserInfoComponent } from '../navbar/user-info/user-info.component';
@Component({
  selector: 'app-navbar-mobile',
  standalone: true,
  imports: [SidebarModule, RouterModule, NgOptimizedImage, ButtonComponent, UserInfoComponent],
  templateUrl: './navbar-mobile.component.html',
  styleUrl: './navbar-mobile.component.scss'
})
export class NavbarMobileComponent {
  displayMenu: boolean = false;
  isUserLoggedIn: boolean = false;
  currentLanguage: string | null = '';
  navAllLinks: NavbarLinks[] = [];

  constructor(
  ) { }

  ngOnInit(): void {
    this.isUserLoggedIn = true;
    this.navAllLinks = [
      { id: 1, name: 'Home', route: '/Home', icon: 'pi-home' },
      { id: 2, name: 'My Activities', route: '/Activities', icon: 'pi-info-circle' },
      { id: 3, name: 'SPOCs', route: '/Spocs', icon: 'pi-hourglass' },
    ];
  }
  openSidebar(): void {
    this.displayMenu = true;
  }
  closeSidebar(): void {
    this.displayMenu = false;
  }

  logOut(): void {
    this.closeSidebar();
  }
  login(): void {
    this.closeSidebar();
  }
}
