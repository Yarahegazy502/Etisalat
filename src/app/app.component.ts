// Modules
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

// Components
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarMobileComponent } from './shared/components/navbar-mobile/navbar-mobile.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SplashScreenComponent } from './shared/components/splash-screen/splash-screen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ToastModule,

    // Components
    NavbarMobileComponent,
    SplashScreenComponent,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],

})
export class AppComponent {
  title = 'etisalat';
  shouldRender: boolean = false;
  showSplashScreen: boolean = true;

  constructor(
    private router: Router,
  ) {
    this.showSplashScreen = true;
    setTimeout(() => {
      this.showSplashScreen = false;
    }, 2000);
  }

  ngDoCheck(): void {
    this.renderCheck();
  }

  renderCheck(): void {
    if (
      this.router.url.includes('Auth') ||
      this.router.url.includes('Error')
    ) {
      this.shouldRender = false;
    } else {
      this.shouldRender = true;
    }
  }
}
