import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialModules } from './material';
import { AuthService } from './_services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatTabsModule,
    MatToolbarModule,
    MaterialModules,
    HttpClientModule,
  ],
  providers: [AuthService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly authService = inject(AuthService);
  public activeLink = 'search';
  public tabs = [
    {
      id: 1,
      name: 'Search',
      link: 'search',
    },
    {
      id: 2,
      name: 'Profile',
      link: 'profile',
    },
    {
      id: 3,
      name: 'My List',
      link: 'my-list',
    },
  ];

  private readonly router = inject(Router);

  ngOnInit(): void {
    if (!this.authService.userLoggedIn()) {
      this.authService.createUserSession();
    }
  }

  navigate(link: string) {
    this.activeLink = link;
    this.router.navigate([link]);
  }
}
