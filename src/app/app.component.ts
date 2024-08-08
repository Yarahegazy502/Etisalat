// Modules
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

// Components
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,

    // Components
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'etisalat';
  shouldRender: boolean = false;

  constructor(
    private router: Router,
  ) { }

  ngDoCheck(): void {
    this.renderCheck();
  }

  renderCheck(): void {
    if (
      this.router.url.includes('auth')
    ) {
      this.shouldRender = false;
    } else {
      this.shouldRender = true;
    }
  }
}
